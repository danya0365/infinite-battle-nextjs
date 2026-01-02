/**
 * LeaderboardPresenter
 * Handles leaderboard data presentation and business logic
 */

import {
    ILeaderboardRepository,
    LeaderboardEntry,
    LeaderboardStats,
    LeaderboardType,
} from '@/src/application/repositories/ILeaderboardRepository';
import { Metadata } from 'next';

export interface LeaderboardViewModel {
  entries: LeaderboardEntry[];
  stats: LeaderboardStats;
  currentType: LeaderboardType;
  isLoading: boolean;
  error: string | null;
  currentPlayerRank: LeaderboardEntry | null;
}

export class LeaderboardPresenter {
  constructor(private readonly repository: ILeaderboardRepository) {}

  async getViewModel(type: LeaderboardType = 'ranked'): Promise<LeaderboardViewModel> {
    try {
      const [entries, stats] = await Promise.all([
        this.repository.getLeaderboard({ type, limit: 50 }),
        this.repository.getStats(type),
      ]);

      // Mock current player - in real app, get from auth
      const currentPlayerRank = await this.repository.getPlayerRank('profile-15', type);

      return {
        entries,
        stats,
        currentType: type,
        isLoading: false,
        error: null,
        currentPlayerRank,
      };
    } catch (error) {
      return {
        entries: [],
        stats: {
          totalPlayers: 0,
          totalMatches: 0,
          averageWinRate: 0,
          topWinStreak: 0,
        },
        currentType: type,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load leaderboard',
        currentPlayerRank: null,
      };
    }
  }

  async getEntriesForType(type: LeaderboardType, limit: number = 50): Promise<LeaderboardEntry[]> {
    return this.repository.getLeaderboard({ type, limit });
  }

  async getTopPlayers(limit: number = 10): Promise<LeaderboardEntry[]> {
    return this.repository.getTopPlayers(limit);
  }

  getRankTierColor(tier: string): string {
    const colors: Record<string, string> = {
      Bronze: '#cd7f32',
      Silver: '#c0c0c0',
      Gold: '#ffd700',
      Platinum: '#e5e4e2',
      Diamond: '#b9f2ff',
      Master: '#ff6b6b',
      Grandmaster: '#a855f7',
      Legend: '#ff0',
    };
    return colors[tier] || '#888';
  }

  getRankTierGradient(tier: string): string {
    const gradients: Record<string, string> = {
      Bronze: 'linear-gradient(135deg, #cd7f32, #8b4513)',
      Silver: 'linear-gradient(135deg, #c0c0c0, #808080)',
      Gold: 'linear-gradient(135deg, #ffd700, #b8860b)',
      Platinum: 'linear-gradient(135deg, #e5e4e2, #a0a0a0)',
      Diamond: 'linear-gradient(135deg, #b9f2ff, #00bfff)',
      Master: 'linear-gradient(135deg, #ff6b6b, #ee0000)',
      Grandmaster: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      Legend: 'linear-gradient(135deg, #ffd700, #ff6b00, #ff0000)',
    };
    return gradients[tier] || 'linear-gradient(135deg, #888, #666)';
  }

  getRankMedal(rank: number): string {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  getTypeLabel(type: LeaderboardType): string {
    const labels: Record<LeaderboardType, string> = {
      ranked: '🏆 Ranked',
      casual: '🎮 Casual',
      weekly: '📅 Weekly',
      allTime: '⭐ All Time',
    };
    return labels[type];
  }

  generateMetadata(): Metadata {
    return {
      title: 'Leaderboard | Infinite Battle',
      description: 'See the top players in Infinite Battle. Climb the ranks and become a legend!',
      keywords: ['leaderboard', 'rankings', 'top players', 'competitive', 'ranked'],
      openGraph: {
        title: 'Leaderboard | Infinite Battle',
        description: 'Check out the top warriors in Infinite Battle',
        type: 'website',
      },
    };
  }
}
