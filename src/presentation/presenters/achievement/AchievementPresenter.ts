/**
 * AchievementPresenter
 * Handles achievement data presentation and utilities
 */

import {
    AchievementCategory,
    AchievementFilters,
    AchievementRarity,
    AchievementStats,
    AchievementWithProgress,
    IAchievementRepository,
} from '@/src/application/repositories/IAchievementRepository';
import { Metadata } from 'next';

export interface AchievementViewModel {
  achievements: AchievementWithProgress[];
  stats: AchievementStats;
  recentUnlocks: AchievementWithProgress[];
  currentFilter: AchievementFilters;
  isLoading: boolean;
  error: string | null;
}

export class AchievementPresenter {
  constructor(private readonly repository: IAchievementRepository) {}

  async getViewModel(profileId: string, filters?: AchievementFilters): Promise<AchievementViewModel> {
    try {
      const [achievements, stats, recentUnlocks] = await Promise.all([
        this.repository.getAchievements(profileId, filters),
        this.repository.getStats(profileId),
        this.repository.getRecentUnlocks(profileId, 5),
      ]);

      return {
        achievements,
        stats,
        recentUnlocks,
        currentFilter: filters || {},
        isLoading: false,
        error: null,
      };
    } catch (error) {
      return {
        achievements: [],
        stats: {
          totalAchievements: 0,
          unlockedCount: 0,
          totalPoints: 0,
          earnedPoints: 0,
          completionPercent: 0,
          byCategory: {} as AchievementStats['byCategory'],
          byRarity: {} as AchievementStats['byRarity'],
        },
        recentUnlocks: [],
        currentFilter: filters || {},
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load achievements',
      };
    }
  }

  getRarityColor(rarity: AchievementRarity): string {
    const colors: Record<AchievementRarity, string> = {
      common: '#9ca3af',
      uncommon: '#22c55e',
      rare: '#3b82f6',
      epic: '#a855f7',
      legendary: '#f59e0b',
    };
    return colors[rarity];
  }

  getRarityGradient(rarity: AchievementRarity): string {
    const gradients: Record<AchievementRarity, string> = {
      common: 'linear-gradient(135deg, #9ca3af, #6b7280)',
      uncommon: 'linear-gradient(135deg, #22c55e, #16a34a)',
      rare: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      epic: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      legendary: 'linear-gradient(135deg, #f59e0b, #d97706, #ea580c)',
    };
    return gradients[rarity];
  }

  getRarityLabel(rarity: AchievementRarity): string {
    const labels: Record<AchievementRarity, string> = {
      common: 'Common',
      uncommon: 'Uncommon',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary',
    };
    return labels[rarity];
  }

  getCategoryIcon(category: AchievementCategory): string {
    const icons: Record<AchievementCategory, string> = {
      battle: '⚔️',
      collection: '📦',
      social: '👥',
      mastery: '🎯',
      special: '✨',
    };
    return icons[category];
  }

  getCategoryLabel(category: AchievementCategory): string {
    const labels: Record<AchievementCategory, string> = {
      battle: 'Battle',
      collection: 'Collection',
      social: 'Social',
      mastery: 'Mastery',
      special: 'Special',
    };
    return labels[category];
  }

  getRewardLabel(reward: AchievementWithProgress['reward']): string {
    if (!reward) return '';
    
    switch (reward.type) {
      case 'coins':
        return `💰 ${reward.amount} Coins`;
      case 'gems':
        return `💎 ${reward.amount} Gems`;
      case 'character':
        return '🦸 Unlock Character';
      case 'title':
        return '🏷️ Unlock Title';
      case 'badge':
        return '🎖️ Unlock Badge';
      default:
        return '';
    }
  }

  formatProgress(current: number, max: number): string {
    if (max === 1) {
      return current >= max ? '✓ Complete' : 'Not started';
    }
    return `${current.toLocaleString()} / ${max.toLocaleString()}`;
  }

  generateMetadata(): Metadata {
    return {
      title: 'Achievements | Infinite Battle',
      description: 'Track your achievements and earn rewards in Infinite Battle',
      keywords: ['achievements', 'badges', 'rewards', 'progress', 'unlocks'],
      openGraph: {
        title: 'Achievements | Infinite Battle',
        description: 'Unlock achievements and earn exclusive rewards',
        type: 'website',
      },
    };
  }
}
