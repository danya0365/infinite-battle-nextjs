/**
 * BattlePresenter
 * Handles battle logic, card-based combat, and game flow
 */

import { CardMaster, getCardById } from '@/src/data/master/cards';
import { CharacterMaster, getCharacterById } from '@/src/data/master/characters';
import { getStageById, StageMaster } from '@/src/data/master/stages';
import { BattleCharacter, BattleLogEntry, BattlePhase, BattleState, MOCK_BATTLES, MockBattle } from '@/src/data/mock/battles';
import { Metadata } from 'next';

export interface BattleCharacterViewModel {
  characterId: string;
  character: CharacterMaster | undefined;
  currentHp: number;
  maxHp: number;
  hpPercentage: number;
  currentEnergy: number;
  maxEnergy: number;
  energyPercentage: number;
  isActive: boolean;
  canTransform: boolean;
  buffs: { type: string; value: number; turnsRemaining: number }[];
  debuffs: { type: string; value: number; turnsRemaining: number }[];
}

export interface PlayerViewModel {
  profileId: string;
  name: string;
  characters: BattleCharacterViewModel[];
  activeCharacter: BattleCharacterViewModel | undefined;
  hand: CardMaster[];
  vanishGauge: number;
  risingRushReady: boolean;
}

export interface BattleViewModel {
  battle: MockBattle | null;
  state: BattleState;
  phase: BattlePhase;
  currentTurn: number;
  timer: number;
  player: PlayerViewModel | null;
  opponent: PlayerViewModel | null;
  stage: StageMaster | undefined;
  battleLog: BattleLogEntry[];
  canSelectCards: boolean;
  selectedCards: string[];
  isPlayerTurn: boolean;
  battleResult: 'ongoing' | 'victory' | 'defeat' | 'draw';
}

export interface BattleAction {
  type: 'use_card' | 'use_skill' | 'vanish' | 'rising_rush' | 'switch_character' | 'transform';
  cardId?: string;
  skillId?: string;
  targetCharacterId?: string;
}

export class BattlePresenter {
  private battle: MockBattle | null = null;
  private selectedCards: string[] = [];

  constructor(battleId?: string) {
    if (battleId) {
      this.battle = MOCK_BATTLES.find((b) => b.id === battleId) || null;
    } else {
      // Get first active battle for demo
      this.battle = MOCK_BATTLES.find((b) => b.state !== 'finished') || MOCK_BATTLES[0] || null;
    }
  }

  private transformCharacter(battleChar: BattleCharacter): BattleCharacterViewModel {
    const character = getCharacterById(battleChar.characterId);
    return {
      characterId: battleChar.characterId,
      character,
      currentHp: battleChar.currentHp,
      maxHp: battleChar.maxHp,
      hpPercentage: Math.round((battleChar.currentHp / battleChar.maxHp) * 100),
      currentEnergy: battleChar.currentEnergy,
      maxEnergy: battleChar.maxEnergy,
      energyPercentage: Math.round((battleChar.currentEnergy / battleChar.maxEnergy) * 100),
      isActive: battleChar.isActive,
      canTransform: battleChar.canTransform,
      buffs: battleChar.buffs.map((b) => ({
        type: b.type,
        value: b.value,
        turnsRemaining: b.turnsRemaining,
      })),
      debuffs: battleChar.debuffs.map((d) => ({
        type: d.type,
        value: d.value,
        turnsRemaining: d.turnsRemaining,
      })),
    };
  }

  private transformPlayer(
    player: MockBattle['player'] | MockBattle['opponent'],
    name: string
  ): PlayerViewModel {
    const characters = player.characters.map((c) => this.transformCharacter(c));
    const hand = player.hand
      .map((cardId) => getCardById(cardId))
      .filter((card): card is CardMaster => card !== undefined);

    return {
      profileId: player.profileId || 'cpu',
      name,
      characters,
      activeCharacter: characters.find((c) => c.isActive),
      hand,
      vanishGauge: player.vanishGauge,
      risingRushReady: player.risingRushReady,
    };
  }

  private determineBattleResult(): 'ongoing' | 'victory' | 'defeat' | 'draw' {
    if (!this.battle || this.battle.state !== 'finished') return 'ongoing';

    const playerAlive = this.battle.player.characters.some((c) => c.currentHp > 0);
    const opponentAlive = this.battle.opponent.characters.some((c) => c.currentHp > 0);

    if (playerAlive && !opponentAlive) return 'victory';
    if (!playerAlive && opponentAlive) return 'defeat';
    if (!playerAlive && !opponentAlive) return 'draw';

    return 'ongoing';
  }

  getViewModel(): BattleViewModel {
    if (!this.battle) {
      return {
        battle: null,
        state: 'waiting',
        phase: 'card_selection',
        currentTurn: 0,
        timer: 0,
        player: null,
        opponent: null,
        stage: undefined,
        battleLog: [],
        canSelectCards: false,
        selectedCards: [],
        isPlayerTurn: true,
        battleResult: 'ongoing',
      };
    }

    const stage = getStageById(this.battle.stageId);

    return {
      battle: this.battle,
      state: this.battle.state,
      phase: this.battle.phase,
      currentTurn: this.battle.currentTurn,
      timer: this.battle.timer,
      player: this.transformPlayer(this.battle.player, 'Player'),
      opponent: this.transformPlayer(this.battle.opponent, this.battle.opponent.name),
      stage,
      battleLog: this.battle.battleLog,
      canSelectCards: this.battle.phase === 'card_selection' && this.battle.state === 'fighting',
      selectedCards: this.selectedCards,
      isPlayerTurn: this.battle.phase === 'card_selection',
      battleResult: this.determineBattleResult(),
    };
  }

  selectCard(cardId: string): void {
    if (!this.selectedCards.includes(cardId)) {
      this.selectedCards.push(cardId);
    }
  }

  deselectCard(cardId: string): void {
    this.selectedCards = this.selectedCards.filter((id) => id !== cardId);
  }

  clearSelectedCards(): void {
    this.selectedCards = [];
  }

  // Calculate damage based on card and character stats
  calculateDamage(card: CardMaster, attacker: CharacterMaster, defender: CharacterMaster): number {
    const baseDamage = card.power * (attacker.baseStats.attack / 100);
    const defense = defender.baseStats.defense / 100;
    const finalDamage = Math.max(1, Math.round(baseDamage * (1 - defense * 0.3)));
    return finalDamage;
  }

  // Execute a battle action (for simulation)
  executeAction(action: BattleAction): BattleLogEntry | null {
    if (!this.battle) return null;

    const entry: BattleLogEntry = {
      turn: this.battle.currentTurn,
      phase: this.battle.phase,
      action: action.type,
      actor: 'player',
      characterId: this.battle.player.characters.find((c) => c.isActive)?.characterId || '',
      cardId: action.cardId,
      skillId: action.skillId,
      timestamp: new Date().toISOString(),
    };

    // Calculate damage if using a card
    if (action.type === 'use_card' && action.cardId) {
      const card = getCardById(action.cardId);
      const activePlayerChar = this.battle.player.characters.find((c) => c.isActive);
      const activeOpponentChar = this.battle.opponent.characters.find((c) => c.isActive);

      if (card && activePlayerChar && activeOpponentChar) {
        const playerCharMaster = getCharacterById(activePlayerChar.characterId);
        const opponentCharMaster = getCharacterById(activeOpponentChar.characterId);

        if (playerCharMaster && opponentCharMaster) {
          entry.damage = this.calculateDamage(card, playerCharMaster, opponentCharMaster);
        }
      }
    }

    return entry;
  }

  // Get available battle modes
  static getBattleModes(): { id: string; name: string; description: string; icon: string }[] {
    return [
      {
        id: 'story',
        name: 'Story Mode',
        description: 'Experience the epic story campaign',
        icon: '📖',
      },
      {
        id: 'pvp',
        name: 'PvP Battle',
        description: 'Challenge other players online',
        icon: '⚔️',
      },
      {
        id: 'training',
        name: 'Training',
        description: 'Practice against CPU opponents',
        icon: '🎯',
      },
      {
        id: 'event',
        name: 'Events',
        description: 'Limited-time special battles',
        icon: '🎉',
      },
    ];
  }

  // Start a new battle (mock)
  static startNewBattle(mode: string, characterIds: string[], stageId: string): MockBattle {
    const playerCharacters: BattleCharacter[] = characterIds.map((id, index) => {
      const char = getCharacterById(id);
      return {
        characterId: id,
        currentHp: char?.baseStats.hp || 10000,
        maxHp: char?.baseStats.hp || 10000,
        currentEnergy: char?.baseStats.energy || 100,
        maxEnergy: char?.baseStats.energy || 100,
        buffs: [],
        debuffs: [],
        isActive: index === 0,
        canTransform: !!char?.transformations?.length,
      };
    });

    // Create CPU opponent
    const cpuCharacters: BattleCharacter[] = [
      {
        characterId: 'hero-02',
        currentHp: 7500,
        maxHp: 7500,
        currentEnergy: 90,
        maxEnergy: 90,
        buffs: [],
        debuffs: [],
        isActive: true,
        canTransform: false,
      },
    ];

    return {
      id: `battle-${Date.now()}`,
      matchId: `match-${Date.now()}`,
      state: 'ready',
      phase: 'card_selection',
      currentTurn: 1,
      timer: 15,
      player: {
        profileId: 'profile-001',
        characters: playerCharacters,
        hand: ['card-punch', 'card-kick', 'card-blast', 'card-combo'],
        vanishGauge: 100,
        risingRushReady: false,
      },
      opponent: {
        profileId: null,
        name: `CPU - ${mode === 'training' ? 'Training' : 'Normal'}`,
        characters: cpuCharacters,
        hand: ['card-slash', 'card-throw'],
        vanishGauge: 100,
        risingRushReady: false,
      },
      stageId,
      battleLog: [],
      createdAt: new Date().toISOString(),
    };
  }

  generateMetadata(): Metadata {
    return {
      title: 'Battle Arena | Infinite Battle',
      description: 'Engage in epic card-based combat battles with your favorite characters!',
      keywords: ['battle', 'combat', 'card game', 'fighting', 'PvP'],
      openGraph: {
        title: 'Battle Arena | Infinite Battle',
        description: 'Engage in epic card-based combat battles!',
        type: 'website',
      },
    };
  }
}
