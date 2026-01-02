/**
 * Mock Data: Profiles
 * Contains mock profile data for development
 */

export interface MockProfile {
  id: string;
  userId: string;
  name: string;
  level: number;
  experience: number;
  experienceToNext: number;
  rank: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'legend';
  wins: number;
  losses: number;
  draws: number;
  winStreak: number;
  bestWinStreak: number;
  favoriteCharacterId: string;
  ownedCharacterIds: string[];
  currency: {
    crystals: number;
    coins: number;
    tickets: number;
  };
  statistics: {
    totalMatches: number;
    totalDamageDealt: number;
    totalDamageTaken: number;
    perfectWins: number;
    comebackWins: number;
  };
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
}

export const MOCK_PROFILES: MockProfile[] = [
  {
    id: 'profile-001',
    userId: 'user-001',
    name: 'DragonMaster',
    level: 25,
    experience: 12500,
    experienceToNext: 15000,
    rank: 'gold',
    wins: 150,
    losses: 50,
    draws: 10,
    winStreak: 5,
    bestWinStreak: 15,
    favoriteCharacterId: 'hero-01',
    ownedCharacterIds: ['hero-01', 'hero-01-ssj', 'hero-02', 'hero-03', 'hero-04', 'hero-05', 'hero-06'],
    currency: {
      crystals: 5000,
      coins: 150000,
      tickets: 25,
    },
    statistics: {
      totalMatches: 210,
      totalDamageDealt: 2500000,
      totalDamageTaken: 1800000,
      perfectWins: 20,
      comebackWins: 15,
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T12:30:00.000Z',
    lastActiveAt: '2024-01-20T18:00:00.000Z',
  },
  {
    id: 'profile-002',
    userId: 'user-001',
    name: 'AltProfile',
    level: 10,
    experience: 4500,
    experienceToNext: 5000,
    rank: 'silver',
    wins: 30,
    losses: 20,
    draws: 5,
    winStreak: 2,
    bestWinStreak: 8,
    favoriteCharacterId: 'hero-02',
    ownedCharacterIds: ['hero-02', 'hero-06'],
    currency: {
      crystals: 1000,
      coins: 25000,
      tickets: 5,
    },
    statistics: {
      totalMatches: 55,
      totalDamageDealt: 500000,
      totalDamageTaken: 450000,
      perfectWins: 3,
      comebackWins: 5,
    },
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-18T10:00:00.000Z',
    lastActiveAt: '2024-01-19T15:00:00.000Z',
  },
  {
    id: 'profile-003',
    userId: 'user-002',
    name: 'ShadowNinja',
    level: 35,
    experience: 28000,
    experienceToNext: 35000,
    rank: 'platinum',
    wins: 250,
    losses: 80,
    draws: 20,
    winStreak: 12,
    bestWinStreak: 25,
    favoriteCharacterId: 'hero-02',
    ownedCharacterIds: ['hero-01', 'hero-01-ssj', 'hero-02', 'hero-03', 'hero-04', 'hero-05', 'hero-06'],
    currency: {
      crystals: 12000,
      coins: 350000,
      tickets: 50,
    },
    statistics: {
      totalMatches: 350,
      totalDamageDealt: 4500000,
      totalDamageTaken: 2800000,
      perfectWins: 45,
      comebackWins: 30,
    },
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-20T18:45:00.000Z',
    lastActiveAt: '2024-01-20T20:00:00.000Z',
  },
  {
    id: 'profile-004',
    userId: 'user-003',
    name: 'FireLord',
    level: 18,
    experience: 8500,
    experienceToNext: 10000,
    rank: 'silver',
    wins: 80,
    losses: 60,
    draws: 10,
    winStreak: 3,
    bestWinStreak: 10,
    favoriteCharacterId: 'hero-04',
    ownedCharacterIds: ['hero-04', 'hero-05', 'hero-06'],
    currency: {
      crystals: 2500,
      coins: 75000,
      tickets: 15,
    },
    statistics: {
      totalMatches: 150,
      totalDamageDealt: 1200000,
      totalDamageTaken: 1100000,
      perfectWins: 8,
      comebackWins: 12,
    },
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-25T09:15:00.000Z',
    lastActiveAt: '2024-01-25T12:00:00.000Z',
  },
];

export const getMockProfileById = (id: string): MockProfile | undefined => {
  return MOCK_PROFILES.find((profile) => profile.id === id);
};

export const getMockProfilesByUserId = (userId: string): MockProfile[] => {
  return MOCK_PROFILES.filter((profile) => profile.userId === userId);
};

export const CURRENT_MOCK_PROFILE = MOCK_PROFILES[0];
