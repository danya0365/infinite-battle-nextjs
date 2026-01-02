/**
 * MockLeaderboardRepository
 * Mock implementation for leaderboard data
 */

import {
    ILeaderboardRepository,
    LeaderboardEntry,
    LeaderboardFilters,
    LeaderboardStats,
    LeaderboardType,
} from '@/src/application/repositories/ILeaderboardRepository';

// Generate mock leaderboard data
const generateMockLeaderboard = (): LeaderboardEntry[] => {
  const names = [
    'DragonMaster99', 'ShadowNinja', 'LightWarrior', 'PhoenixRise',
    'ThunderStrike', 'IceQueen', 'FireLord', 'WindWalker',
    'EarthBender', 'DarkKnight', 'SunBlade', 'MoonShade',
    'StarFury', 'CosmicPower', 'InfiniteLoop', 'PixelHunter',
    'CyberNinja', 'GalaxyRider', 'QuantumLeap', 'NeonStrike',
    'BlazeMaster', 'FrostBite', 'VoltEdge', 'SteelFist',
    'CrimsonWave', 'JadePhoenix', 'OnyxShadow', 'RubyBlaze',
    'SapphireStorm', 'EmeraldVine',
  ];

  const ranks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Legend'];
  const characters = ['hero-01', 'hero-02', 'hero-03', 'hero-04', 'hero-05', 'hero-06'];
  const avatars = ['🦸', '🧙', '🥷', '🦹', '👨‍🚀', '🤖', '👾', '🎮'];

  return names.map((name, index) => {
    const wins = Math.floor(Math.random() * 500) + 50;
    const losses = Math.floor(Math.random() * 300) + 20;
    const winRate = Math.round((wins / (wins + losses)) * 100);
    const rankIndex = Math.min(Math.floor((wins / 80)), ranks.length - 1);

    return {
      rank: index + 1,
      profileId: `profile-${index + 1}`,
      displayName: name,
      avatar: avatars[index % avatars.length],
      level: Math.floor(Math.random() * 50) + 10,
      rankTier: ranks[rankIndex],
      rankPoints: Math.floor(Math.random() * 2000) + 500,
      wins,
      losses,
      winRate,
      winStreak: Math.floor(Math.random() * 15),
      favoriteCharacter: characters[Math.floor(Math.random() * characters.length)],
      totalDamage: Math.floor(Math.random() * 5000000) + 100000,
      bestCombo: Math.floor(Math.random() * 50) + 5,
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }).sort((a, b) => b.rankPoints - a.rankPoints).map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
};

const MOCK_LEADERBOARD = generateMockLeaderboard();

export class MockLeaderboardRepository implements ILeaderboardRepository {
  private entries: LeaderboardEntry[] = [...MOCK_LEADERBOARD];

  async getLeaderboard(filters: LeaderboardFilters): Promise<LeaderboardEntry[]> {
    await this.delay(150);

    let result = [...this.entries];

    // Apply different sorting based on type
    switch (filters.type) {
      case 'ranked':
        result.sort((a, b) => b.rankPoints - a.rankPoints);
        break;
      case 'casual':
        result.sort((a, b) => b.wins - a.wins);
        break;
      case 'weekly':
        // Filter to active in last 7 days and sort by win rate
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        result = result.filter(e => new Date(e.lastActive) > weekAgo);
        result.sort((a, b) => b.winRate - a.winRate);
        break;
      case 'allTime':
        result.sort((a, b) => b.totalDamage - a.totalDamage);
        break;
    }

    // Re-assign ranks
    result = result.map((entry, index) => ({ ...entry, rank: index + 1 }));

    // Apply pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || 20;
    
    return result.slice(offset, offset + limit);
  }

  async getPlayerRank(profileId: string, type: LeaderboardType): Promise<LeaderboardEntry | null> {
    await this.delay(50);
    
    const allEntries = await this.getLeaderboard({ type, limit: 100 });
    return allEntries.find(e => e.profileId === profileId) || null;
  }

  async getStats(type: LeaderboardType): Promise<LeaderboardStats> {
    await this.delay(50);

    const entries = await this.getLeaderboard({ type, limit: 100 });
    const totalPlayers = entries.length;
    const totalMatches = entries.reduce((sum, e) => sum + e.wins + e.losses, 0);
    const averageWinRate = Math.round(
      entries.reduce((sum, e) => sum + e.winRate, 0) / totalPlayers
    );
    const topWinStreak = Math.max(...entries.map(e => e.winStreak));

    return {
      totalPlayers,
      totalMatches,
      averageWinRate,
      topWinStreak,
    };
  }

  async getTopPlayers(limit: number): Promise<LeaderboardEntry[]> {
    await this.delay(100);
    return this.entries.slice(0, limit);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const mockLeaderboardRepository = new MockLeaderboardRepository();
