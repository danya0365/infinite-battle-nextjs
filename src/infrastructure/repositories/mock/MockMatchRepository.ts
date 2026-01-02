/**
 * MockMatchRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - this is in the Infrastructure layer
 */

import {
    IMatchRepository,
    MatchFilters,
    MatchStats,
    PaginatedResult,
} from '@/src/application/repositories/IMatchRepository';
import { MOCK_MATCHES, MockMatch } from '@/src/data/mock/matches';

export class MockMatchRepository implements IMatchRepository {
  private matches: MockMatch[] = [...MOCK_MATCHES];

  async getById(id: string): Promise<MockMatch | null> {
    await this.delay(50);
    return this.matches.find((match) => match.id === id) || null;
  }

  async getAll(): Promise<MockMatch[]> {
    await this.delay(100);
    return [...this.matches];
  }

  async getByProfileId(profileId: string): Promise<MockMatch[]> {
    await this.delay(100);
    return this.matches.filter((match) => match.profileId === profileId);
  }

  async getFiltered(filters: MatchFilters): Promise<MockMatch[]> {
    await this.delay(100);

    let result = [...this.matches];

    if (filters.profileId) {
      result = result.filter((match) => match.profileId === filters.profileId);
    }

    if (filters.type) {
      result = result.filter((match) => match.type === filters.type);
    }

    if (filters.result) {
      result = result.filter((match) => match.result === filters.result);
    }

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      result = result.filter((match) => new Date(match.playedAt) >= startDate);
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      result = result.filter((match) => new Date(match.playedAt) <= endDate);
    }

    // Sort by date descending
    result.sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime());

    return result;
  }

  async getPaginated(
    page: number,
    perPage: number,
    filters?: MatchFilters
  ): Promise<PaginatedResult<MockMatch>> {
    await this.delay(100);

    let filtered = filters ? await this.getFiltered(filters) : [...this.matches];

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedItems = filtered.slice(start, end);

    return {
      data: paginatedItems,
      total: filtered.length,
      page,
      perPage,
    };
  }

  async getRecent(profileId: string, limit: number): Promise<MockMatch[]> {
    await this.delay(50);
    
    return this.matches
      .filter((match) => match.profileId === profileId)
      .sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime())
      .slice(0, limit);
  }

  async getStatsByProfileId(profileId: string): Promise<MatchStats> {
    await this.delay(50);

    const profileMatches = this.matches.filter((match) => match.profileId === profileId);

    const totalMatches = profileMatches.length;
    const wins = profileMatches.filter((m) => m.result === 'win').length;
    const losses = profileMatches.filter((m) => m.result === 'loss').length;
    const draws = profileMatches.filter((m) => m.result === 'draw').length;
    const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

    const totalDamageDealt = profileMatches.reduce((sum, m) => sum + (m.stats?.damageDealt || 0), 0);
    const totalDamageTaken = profileMatches.reduce((sum, m) => sum + (m.stats?.damageTaken || 0), 0);
    const averageDamage = totalMatches > 0 ? Math.round(totalDamageDealt / totalMatches) : 0;
    const bestCombo = Math.max(0, ...profileMatches.map((m) => m.stats?.maxCombo || 0));

    return {
      totalMatches,
      wins,
      losses,
      draws,
      winRate,
      averageDamage,
      bestCombo,
      totalDamageDealt,
      totalDamageTaken,
    };
  }

  async getGlobalStats(): Promise<MatchStats> {
    await this.delay(50);

    const totalMatches = this.matches.length;
    const wins = this.matches.filter((m) => m.result === 'win').length;
    const losses = this.matches.filter((m) => m.result === 'loss').length;
    const draws = this.matches.filter((m) => m.result === 'draw').length;
    const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

    const totalDamageDealt = this.matches.reduce((sum, m) => sum + (m.stats?.damageDealt || 0), 0);
    const totalDamageTaken = this.matches.reduce((sum, m) => sum + (m.stats?.damageTaken || 0), 0);
    const averageDamage = totalMatches > 0 ? Math.round(totalDamageDealt / totalMatches) : 0;
    const bestCombo = Math.max(0, ...this.matches.map((m) => m.stats?.maxCombo || 0));

    return {
      totalMatches,
      wins,
      losses,
      draws,
      winRate,
      averageDamage,
      bestCombo,
      totalDamageDealt,
      totalDamageTaken,
    };
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance for convenience
export const mockMatchRepository = new MockMatchRepository();
