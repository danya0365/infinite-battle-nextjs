/**
 * Mock Data: Matches
 * Contains mock match history data for development
 */

export type MatchResult = 'win' | 'loss' | 'draw';
export type MatchType = 'pvp' | 'pve' | 'ranked' | 'casual';

export interface MockMatch {
  id: string;
  profileId: string;
  opponentId: string | null; // null for PvE
  opponentName: string;
  opponentLevel: number;
  type: MatchType;
  result: MatchResult;
  myCharacterIds: string[];
  opponentCharacterIds: string[];
  stageId: string;
  duration: number; // in seconds
  score: {
    mine: number;
    opponent: number;
  };
  stats: {
    damageDealt: number;
    damageTaken: number;
    cardsUsed: number;
    skillsUsed: number;
    perfectDodges: number;
    comboMax: number;
  };
  replayId?: string;
  createdAt: string;
}

export const MOCK_MATCHES: MockMatch[] = [
  {
    id: 'match-001',
    profileId: 'profile-001',
    opponentId: 'profile-003',
    opponentName: 'ShadowNinja',
    opponentLevel: 35,
    type: 'ranked',
    result: 'win',
    myCharacterIds: ['hero-01', 'hero-01-ssj'],
    opponentCharacterIds: ['hero-02', 'hero-06'],
    stageId: 'stage-tournament',
    duration: 180,
    score: { mine: 2, opponent: 1 },
    stats: {
      damageDealt: 45000,
      damageTaken: 32000,
      cardsUsed: 25,
      skillsUsed: 8,
      perfectDodges: 5,
      comboMax: 15,
    },
    replayId: 'replay-001',
    createdAt: '2024-01-20T15:30:00.000Z',
  },
  {
    id: 'match-002',
    profileId: 'profile-001',
    opponentId: null,
    opponentName: 'CPU - Hard',
    opponentLevel: 20,
    type: 'pve',
    result: 'win',
    myCharacterIds: ['hero-01'],
    opponentCharacterIds: ['hero-04'],
    stageId: 'stage-volcano',
    duration: 120,
    score: { mine: 3, opponent: 0 },
    stats: {
      damageDealt: 38000,
      damageTaken: 15000,
      cardsUsed: 18,
      skillsUsed: 5,
      perfectDodges: 8,
      comboMax: 20,
    },
    createdAt: '2024-01-20T14:00:00.000Z',
  },
  {
    id: 'match-003',
    profileId: 'profile-001',
    opponentId: 'profile-004',
    opponentName: 'FireLord',
    opponentLevel: 18,
    type: 'pvp',
    result: 'win',
    myCharacterIds: ['hero-03', 'hero-05'],
    opponentCharacterIds: ['hero-04', 'hero-06'],
    stageId: 'stage-ocean',
    duration: 200,
    score: { mine: 2, opponent: 0 },
    stats: {
      damageDealt: 52000,
      damageTaken: 28000,
      cardsUsed: 30,
      skillsUsed: 10,
      perfectDodges: 6,
      comboMax: 12,
    },
    replayId: 'replay-002',
    createdAt: '2024-01-19T20:15:00.000Z',
  },
  {
    id: 'match-004',
    profileId: 'profile-001',
    opponentId: 'profile-003',
    opponentName: 'ShadowNinja',
    opponentLevel: 35,
    type: 'ranked',
    result: 'loss',
    myCharacterIds: ['hero-02', 'hero-04'],
    opponentCharacterIds: ['hero-01-ssj', 'hero-03'],
    stageId: 'stage-void',
    duration: 150,
    score: { mine: 1, opponent: 2 },
    stats: {
      damageDealt: 35000,
      damageTaken: 48000,
      cardsUsed: 22,
      skillsUsed: 7,
      perfectDodges: 3,
      comboMax: 8,
    },
    replayId: 'replay-003',
    createdAt: '2024-01-18T18:00:00.000Z',
  },
  {
    id: 'match-005',
    profileId: 'profile-001',
    opponentId: null,
    opponentName: 'CPU - Expert',
    opponentLevel: 30,
    type: 'pve',
    result: 'loss',
    myCharacterIds: ['hero-06'],
    opponentCharacterIds: ['hero-01-ssj'],
    stageId: 'stage-hyperbolic',
    duration: 90,
    score: { mine: 0, opponent: 3 },
    stats: {
      damageDealt: 18000,
      damageTaken: 42000,
      cardsUsed: 15,
      skillsUsed: 4,
      perfectDodges: 2,
      comboMax: 5,
    },
    createdAt: '2024-01-17T16:30:00.000Z',
  },
  {
    id: 'match-006',
    profileId: 'profile-001',
    opponentId: 'profile-004',
    opponentName: 'FireLord',
    opponentLevel: 18,
    type: 'casual',
    result: 'draw',
    myCharacterIds: ['hero-01', 'hero-03'],
    opponentCharacterIds: ['hero-04', 'hero-05'],
    stageId: 'stage-planet-namek',
    duration: 300,
    score: { mine: 2, opponent: 2 },
    stats: {
      damageDealt: 55000,
      damageTaken: 55000,
      cardsUsed: 40,
      skillsUsed: 12,
      perfectDodges: 7,
      comboMax: 10,
    },
    createdAt: '2024-01-16T12:00:00.000Z',
  },
];

export const getMockMatchById = (id: string): MockMatch | undefined => {
  return MOCK_MATCHES.find((match) => match.id === id);
};

export const getMockMatchesByProfileId = (profileId: string): MockMatch[] => {
  return MOCK_MATCHES.filter((match) => match.profileId === profileId);
};

export const getMockMatchesByType = (type: MatchType): MockMatch[] => {
  return MOCK_MATCHES.filter((match) => match.type === type);
};
