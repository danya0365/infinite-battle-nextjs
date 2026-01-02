/**
 * MockBattleRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - this is in the Infrastructure layer
 */

import {
    BattleStats,
    CreateBattleData,
    IBattleRepository,
} from '@/src/application/repositories/IBattleRepository';
import { getCharacterById } from '@/src/data/master/characters';
import {
    BattleCharacter,
    BattleLogEntry,
    BattlePhase,
    BattleState,
    MOCK_BATTLES,
    MockBattle,
} from '@/src/data/mock/battles';

export class MockBattleRepository implements IBattleRepository {
  private battles: MockBattle[] = [...MOCK_BATTLES];

  async getById(id: string): Promise<MockBattle | null> {
    await this.delay(50);
    return this.battles.find((battle) => battle.id === id) || null;
  }

  async getAll(): Promise<MockBattle[]> {
    await this.delay(100);
    return [...this.battles];
  }

  async getByProfileId(profileId: string): Promise<MockBattle[]> {
    await this.delay(100);
    return this.battles.filter((battle) => battle.player.profileId === profileId);
  }

  async getActiveBattleByProfileId(profileId: string): Promise<MockBattle | null> {
    await this.delay(50);
    return (
      this.battles.find(
        (battle) =>
          battle.player.profileId === profileId && battle.state !== 'finished'
      ) || null
    );
  }

  async create(data: CreateBattleData): Promise<MockBattle> {
    await this.delay(200);

    const playerCharacters: BattleCharacter[] = data.characterIds.map((id, index) => {
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

    const opponentCharacters: BattleCharacter[] = (
      data.opponentCharacterIds || ['hero-02']
    ).map((id, index) => {
      const char = getCharacterById(id);
      return {
        characterId: id,
        currentHp: char?.baseStats.hp || 7500,
        maxHp: char?.baseStats.hp || 7500,
        currentEnergy: char?.baseStats.energy || 90,
        maxEnergy: char?.baseStats.energy || 90,
        buffs: [],
        debuffs: [],
        isActive: index === 0,
        canTransform: false,
      };
    });

    const newBattle: MockBattle = {
      id: `battle-${Date.now()}`,
      matchId: data.matchId,
      state: 'ready',
      phase: 'card_selection',
      currentTurn: 1,
      timer: 15,
      player: {
        profileId: data.profileId,
        characters: playerCharacters,
        hand: ['card-punch', 'card-kick', 'card-blast', 'card-combo'],
        vanishGauge: 100,
        risingRushReady: false,
      },
      opponent: {
        profileId: null,
        name: data.opponentName || 'CPU',
        characters: opponentCharacters,
        hand: ['card-slash', 'card-throw', 'card-swift-strike'],
        vanishGauge: 100,
        risingRushReady: false,
      },
      stageId: data.stageId,
      battleLog: [],
      createdAt: new Date().toISOString(),
    };

    this.battles.unshift(newBattle);
    return newBattle;
  }

  async updateState(id: string, state: BattleState): Promise<MockBattle> {
    await this.delay(50);

    const index = this.battles.findIndex((battle) => battle.id === id);
    if (index === -1) {
      throw new Error('Battle not found');
    }

    this.battles[index] = {
      ...this.battles[index],
      state,
    };

    return this.battles[index];
  }

  async updatePhase(id: string, phase: BattlePhase): Promise<MockBattle> {
    await this.delay(50);

    const index = this.battles.findIndex((battle) => battle.id === id);
    if (index === -1) {
      throw new Error('Battle not found');
    }

    this.battles[index] = {
      ...this.battles[index],
      phase,
    };

    return this.battles[index];
  }

  async addLogEntry(id: string, entry: BattleLogEntry): Promise<MockBattle> {
    await this.delay(50);

    const index = this.battles.findIndex((battle) => battle.id === id);
    if (index === -1) {
      throw new Error('Battle not found');
    }

    this.battles[index] = {
      ...this.battles[index],
      battleLog: [...this.battles[index].battleLog, entry],
    };

    return this.battles[index];
  }

  async updateCharacterHp(
    battleId: string,
    isPlayer: boolean,
    characterId: string,
    newHp: number
  ): Promise<MockBattle> {
    await this.delay(50);

    const index = this.battles.findIndex((battle) => battle.id === battleId);
    if (index === -1) {
      throw new Error('Battle not found');
    }

    const battle = this.battles[index];
    const targetSide = isPlayer ? battle.player : battle.opponent;
    
    const charIndex = targetSide.characters.findIndex(
      (char) => char.characterId === characterId
    );
    if (charIndex === -1) {
      throw new Error('Character not found in battle');
    }

    targetSide.characters[charIndex] = {
      ...targetSide.characters[charIndex],
      currentHp: Math.max(0, newHp),
    };

    return battle;
  }

  async endBattle(id: string): Promise<MockBattle> {
    await this.delay(100);

    const index = this.battles.findIndex((battle) => battle.id === id);
    if (index === -1) {
      throw new Error('Battle not found');
    }

    this.battles[index] = {
      ...this.battles[index],
      state: 'finished',
      timer: 0,
    };

    return this.battles[index];
  }

  async getStats(): Promise<BattleStats> {
    await this.delay(50);

    const totalBattles = this.battles.length;
    const activeBattles = this.battles.filter((b) => b.state !== 'finished').length;
    const finishedBattles = this.battles.filter((b) => b.state === 'finished').length;
    const averageTurns =
      finishedBattles > 0
        ? Math.round(
            this.battles
              .filter((b) => b.state === 'finished')
              .reduce((sum, b) => sum + b.currentTurn, 0) / finishedBattles
          )
        : 0;

    return {
      totalBattles,
      activeBattles,
      finishedBattles,
      averageTurns,
    };
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance for convenience
export const mockBattleRepository = new MockBattleRepository();
