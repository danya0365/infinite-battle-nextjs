/**
 * ILeaderboardRepository
 * Repository interface for Leaderboard data access
 */

export type LeaderboardType = 'ranked' | 'casual' | 'weekly' | 'allTime';

export interface LeaderboardEntry {
  rank: number;
  profileId: string;
  displayName: string;
  avatar: string;
  level: number;
  rankTier: string;
  rankPoints: number;
  wins: number;
  losses: number;
  winRate: number;
  winStreak: number;
  favoriteCharacter: string | null;
  totalDamage: number;
  bestCombo: number;
  lastActive: string;
}

export interface LeaderboardStats {
  totalPlayers: number;
  totalMatches: number;
  averageWinRate: number;
  topWinStreak: number;
}

export interface LeaderboardFilters {
  type: LeaderboardType;
  limit?: number;
  offset?: number;
}

export interface ILeaderboardRepository {
  /**
   * Get leaderboard entries
   */
  getLeaderboard(filters: LeaderboardFilters): Promise<LeaderboardEntry[]>;

  /**
   * Get player's rank
   */
  getPlayerRank(profileId: string, type: LeaderboardType): Promise<LeaderboardEntry | null>;

  /**
   * Get leaderboard statistics
   */
  getStats(type: LeaderboardType): Promise<LeaderboardStats>;

  /**
   * Get top players
   */
  getTopPlayers(limit: number): Promise<LeaderboardEntry[]>;
}
