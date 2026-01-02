/**
 * IMatchRepository
 * Repository interface for Match data access
 * Following Clean Architecture - this is in the Application layer
 */

import { MockMatch } from '@/src/data/mock/matches';

export interface MatchStats {
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  averageDamage: number;
  bestCombo: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
}

export interface MatchFilters {
  profileId?: string;
  type?: 'pvp' | 'ranked' | 'casual' | 'event';
  result?: 'win' | 'loss' | 'draw';
  startDate?: string;
  endDate?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface IMatchRepository {
  /**
   * Get match by ID
   */
  getById(id: string): Promise<MockMatch | null>;

  /**
   * Get all matches
   */
  getAll(): Promise<MockMatch[]>;

  /**
   * Get matches by profile ID
   */
  getByProfileId(profileId: string): Promise<MockMatch[]>;

  /**
   * Get matches with filters
   */
  getFiltered(filters: MatchFilters): Promise<MockMatch[]>;

  /**
   * Get paginated matches
   */
  getPaginated(page: number, perPage: number, filters?: MatchFilters): Promise<PaginatedResult<MockMatch>>;

  /**
   * Get recent matches (last N matches)
   */
  getRecent(profileId: string, limit: number): Promise<MockMatch[]>;

  /**
   * Get match statistics for a profile
   */
  getStatsByProfileId(profileId: string): Promise<MatchStats>;

  /**
   * Get global statistics
   */
  getGlobalStats(): Promise<MatchStats>;
}
