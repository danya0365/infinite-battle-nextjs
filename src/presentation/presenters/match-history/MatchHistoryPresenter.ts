/**
 * MatchHistoryPresenter
 * Handles business logic for the match history page
 */

import { MockMatch, getMockMatchesByProfileId } from '@/src/data/mock/matches';
import { CURRENT_MOCK_PROFILE } from '@/src/data/mock/profiles';

export type MatchTypeFilter = 'all' | 'ranked' | 'casual' | 'training';
export type MatchResultFilter = 'all' | 'win' | 'loss' | 'draw';

export interface MatchHistoryStats {
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  totalDamageDealt: number;
  totalDamageReceived: number;
  avgMatchDuration: number;
  longestWinStreak: number;
  currentStreak: number;
}

export interface MatchHistoryViewModel {
  matches: MockMatch[];
  filteredMatches: MockMatch[];
  stats: MatchHistoryStats;
  typeFilter: MatchTypeFilter;
  resultFilter: MatchResultFilter;
  dateRange: { from: Date | null; to: Date | null };
  isLoading: boolean;
  error: string | null;
}

export class MatchHistoryPresenter {
  private profileId: string;
  private matches: MockMatch[];

  constructor(profileId?: string) {
    this.profileId = profileId || CURRENT_MOCK_PROFILE.id;
    this.matches = getMockMatchesByProfileId(this.profileId);
  }

  /**
   * Get view model for the match history page
   */
  async getViewModel(): Promise<MatchHistoryViewModel> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const stats = this.calculateStats(this.matches);

    return {
      matches: this.matches,
      filteredMatches: this.matches,
      stats,
      typeFilter: 'all',
      resultFilter: 'all',
      dateRange: { from: null, to: null },
      isLoading: false,
      error: null,
    };
  }

  /**
   * Calculate match history statistics
   */
  private calculateStats(matches: MockMatch[]): MatchHistoryStats {
    if (matches.length === 0) {
      return {
        totalMatches: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winRate: 0,
        totalDamageDealt: 0,
        totalDamageReceived: 0,
        avgMatchDuration: 0,
        longestWinStreak: 0,
        currentStreak: 0,
      };
    }

    const wins = matches.filter((m) => m.result === 'win').length;
    const losses = matches.filter((m) => m.result === 'loss').length;
    const draws = matches.filter((m) => m.result === 'draw').length;
    const totalDamageDealt = matches.reduce((acc, m) => acc + m.stats.damageDealt, 0);
    const totalDamageReceived = matches.reduce((acc, m) => acc + m.stats.damageReceived, 0);
    const avgDuration = matches.reduce((acc, m) => acc + m.stats.duration, 0) / matches.length;

    // Calculate win streak
    let longestStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;
    
    for (const match of matches) {
      if (match.result === 'win') {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    // Current streak (from most recent)
    for (const match of [...matches].reverse()) {
      if (match.result === 'win') {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      totalMatches: matches.length,
      wins,
      losses,
      draws,
      winRate: Math.round((wins / matches.length) * 100),
      totalDamageDealt,
      totalDamageReceived,
      avgMatchDuration: Math.round(avgDuration),
      longestWinStreak: longestStreak,
      currentStreak,
    };
  }

  /**
   * Filter matches by type and result
   */
  filterMatches(
    typeFilter: MatchTypeFilter,
    resultFilter: MatchResultFilter
  ): MockMatch[] {
    let result = [...this.matches];

    if (typeFilter !== 'all') {
      result = result.filter((m) => m.type === typeFilter);
    }

    if (resultFilter !== 'all') {
      result = result.filter((m) => m.result === resultFilter);
    }

    return result;
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: 'Match History - Infinite Battle',
      description: 'View your battle history, statistics, and match details in Infinite Battle.',
    };
  }
}
