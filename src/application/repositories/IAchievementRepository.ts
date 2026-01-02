/**
 * IAchievementRepository
 * Repository interface for Achievements/Badges data access
 */

export type AchievementCategory = 
  | 'battle' 
  | 'collection' 
  | 'social' 
  | 'mastery' 
  | 'special';

export type AchievementRarity = 
  | 'common' 
  | 'uncommon' 
  | 'rare' 
  | 'epic' 
  | 'legendary';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  points: number;
  maxProgress: number;
  requirement: string;
  reward: {
    type: 'coins' | 'gems' | 'character' | 'title' | 'badge';
    amount?: number;
    itemId?: string;
  } | null;
  isSecret: boolean;
  createdAt: string;
}

export interface UserAchievement {
  achievementId: string;
  profileId: string;
  progress: number;
  isUnlocked: boolean;
  unlockedAt: string | null;
}

export interface AchievementWithProgress extends Achievement {
  userProgress: number;
  isUnlocked: boolean;
  unlockedAt: string | null;
  progressPercent: number;
}

export interface AchievementStats {
  totalAchievements: number;
  unlockedCount: number;
  totalPoints: number;
  earnedPoints: number;
  completionPercent: number;
  byCategory: Record<AchievementCategory, { total: number; unlocked: number }>;
  byRarity: Record<AchievementRarity, { total: number; unlocked: number }>;
}

export interface AchievementFilters {
  category?: AchievementCategory;
  rarity?: AchievementRarity;
  unlockedOnly?: boolean;
  lockedOnly?: boolean;
}

export interface IAchievementRepository {
  /**
   * Get all achievements with user progress
   */
  getAchievements(profileId: string, filters?: AchievementFilters): Promise<AchievementWithProgress[]>;

  /**
   * Get achievement by ID with user progress
   */
  getAchievementById(achievementId: string, profileId: string): Promise<AchievementWithProgress | null>;

  /**
   * Get user's achievement statistics
   */
  getStats(profileId: string): Promise<AchievementStats>;

  /**
   * Get recently unlocked achievements
   */
  getRecentUnlocks(profileId: string, limit: number): Promise<AchievementWithProgress[]>;

  /**
   * Update achievement progress
   */
  updateProgress(profileId: string, achievementId: string, progress: number): Promise<void>;

  /**
   * Unlock achievement
   */
  unlockAchievement(profileId: string, achievementId: string): Promise<void>;
}
