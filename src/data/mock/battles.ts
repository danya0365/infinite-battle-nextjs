/**
 * Mock Data: Battles
 * Contains mock active battle data for development
 */

export type BattleState = 'waiting' | 'ready' | 'fighting' | 'paused' | 'finished';
export type BattlePhase = 'card_selection' | 'action' | 'resolution' | 'transition';

export interface BattleCharacter {
  characterId: string;
  currentHp: number;
  maxHp: number;
  currentEnergy: number;
  maxEnergy: number;
  buffs: BattleBuff[];
  debuffs: BattleDebuff[];
  isActive: boolean;
  canTransform: boolean;
}

export interface BattleBuff {
  id: string;
  type: 'attack' | 'defense' | 'speed';
  value: number;
  turnsRemaining: number;
}

export interface BattleDebuff {
  id: string;
  type: 'attack' | 'defense' | 'speed' | 'dot';
  value: number;
  turnsRemaining: number;
}

export interface MockBattle {
  id: string;
  matchId: string;
  state: BattleState;
  phase: BattlePhase;
  currentTurn: number;
  timer: number;
  player: {
    profileId: string;
    characters: BattleCharacter[];
    hand: string[]; // Card IDs
    vanishGauge: number;
    risingRushReady: boolean;
  };
  opponent: {
    profileId: string | null;
    name: string;
    characters: BattleCharacter[];
    hand: string[];
    vanishGauge: number;
    risingRushReady: boolean;
  };
  stageId: string;
  battleLog: BattleLogEntry[];
  createdAt: string;
}

export interface BattleLogEntry {
  turn: number;
  phase: BattlePhase;
  action: string;
  actor: 'player' | 'opponent';
  characterId: string;
  cardId?: string;
  skillId?: string;
  damage?: number;
  heal?: number;
  timestamp: string;
}

export const MOCK_BATTLES: MockBattle[] = [
  {
    id: 'battle-001',
    matchId: 'match-001',
    state: 'fighting',
    phase: 'card_selection',
    currentTurn: 5,
    timer: 15,
    player: {
      profileId: 'profile-001',
      characters: [
        {
          characterId: 'hero-01',
          currentHp: 8500,
          maxHp: 10000,
          currentEnergy: 75,
          maxEnergy: 100,
          buffs: [
            { id: 'buff-001', type: 'attack', value: 10, turnsRemaining: 2 },
          ],
          debuffs: [],
          isActive: true,
          canTransform: true,
        },
        {
          characterId: 'hero-03',
          currentHp: 12000,
          maxHp: 12000,
          currentEnergy: 60,
          maxEnergy: 100,
          buffs: [],
          debuffs: [],
          isActive: false,
          canTransform: false,
        },
      ],
      hand: ['card-punch', 'card-kick', 'card-blast', 'card-combo'],
      vanishGauge: 80,
      risingRushReady: false,
    },
    opponent: {
      profileId: 'profile-003',
      name: 'ShadowNinja',
      characters: [
        {
          characterId: 'hero-02',
          currentHp: 5500,
          maxHp: 7500,
          currentEnergy: 50,
          maxEnergy: 90,
          buffs: [],
          debuffs: [
            { id: 'debuff-001', type: 'defense', value: -15, turnsRemaining: 1 },
          ],
          isActive: true,
          canTransform: false,
        },
        {
          characterId: 'hero-06',
          currentHp: 6500,
          maxHp: 6500,
          currentEnergy: 80,
          maxEnergy: 80,
          buffs: [],
          debuffs: [],
          isActive: false,
          canTransform: false,
        },
      ],
      hand: ['card-slash', 'card-throw', 'card-swift-strike', 'card-dodge'],
      vanishGauge: 60,
      risingRushReady: false,
    },
    stageId: 'stage-tournament',
    battleLog: [
      {
        turn: 1,
        phase: 'action',
        action: 'Use Card',
        actor: 'player',
        characterId: 'hero-01',
        cardId: 'card-punch',
        damage: 1200,
        timestamp: '2024-01-20T15:30:15.000Z',
      },
      {
        turn: 1,
        phase: 'action',
        action: 'Use Card',
        actor: 'opponent',
        characterId: 'hero-02',
        cardId: 'card-slash',
        damage: 1500,
        timestamp: '2024-01-20T15:30:18.000Z',
      },
      {
        turn: 2,
        phase: 'action',
        action: 'Use Skill',
        actor: 'player',
        characterId: 'hero-01',
        skillId: 'skill-light-burst',
        damage: 2500,
        timestamp: '2024-01-20T15:30:35.000Z',
      },
      {
        turn: 3,
        phase: 'action',
        action: 'Use Card',
        actor: 'opponent',
        characterId: 'hero-02',
        cardId: 'card-throw',
        damage: 900,
        timestamp: '2024-01-20T15:30:55.000Z',
      },
      {
        turn: 4,
        phase: 'action',
        action: 'Use Card',
        actor: 'player',
        characterId: 'hero-01',
        cardId: 'card-combo',
        damage: 2000,
        timestamp: '2024-01-20T15:31:15.000Z',
      },
    ],
    createdAt: '2024-01-20T15:30:00.000Z',
  },
  {
    id: 'battle-002',
    matchId: 'match-002',
    state: 'finished',
    phase: 'resolution',
    currentTurn: 8,
    timer: 0,
    player: {
      profileId: 'profile-001',
      characters: [
        {
          characterId: 'hero-01',
          currentHp: 7200,
          maxHp: 10000,
          currentEnergy: 45,
          maxEnergy: 100,
          buffs: [],
          debuffs: [],
          isActive: true,
          canTransform: false,
        },
      ],
      hand: ['card-punch', 'card-blast'],
      vanishGauge: 20,
      risingRushReady: true,
    },
    opponent: {
      profileId: null,
      name: 'CPU - Hard',
      characters: [
        {
          characterId: 'hero-04',
          currentHp: 0,
          maxHp: 8000,
          currentEnergy: 0,
          maxEnergy: 85,
          buffs: [],
          debuffs: [],
          isActive: false,
          canTransform: false,
        },
      ],
      hand: [],
      vanishGauge: 0,
      risingRushReady: false,
    },
    stageId: 'stage-volcano',
    battleLog: [
      {
        turn: 8,
        phase: 'action',
        action: 'Rising Rush',
        actor: 'player',
        characterId: 'hero-01',
        damage: 8000,
        timestamp: '2024-01-20T14:02:00.000Z',
      },
    ],
    createdAt: '2024-01-20T14:00:00.000Z',
  },
];

export const getMockBattleById = (id: string): MockBattle | undefined => {
  return MOCK_BATTLES.find((battle) => battle.id === id);
};

export const getMockActiveBattleByProfileId = (profileId: string): MockBattle | undefined => {
  return MOCK_BATTLES.find(
    (battle) => battle.player.profileId === profileId && battle.state !== 'finished'
  );
};
