/**
 * MockAchievementRepository
 * Mock implementation with predefined achievements and random progress
 */

import {
    Achievement,
    AchievementCategory,
    AchievementFilters,
    AchievementRarity,
    AchievementStats,
    AchievementWithProgress,
    IAchievementRepository,
} from '@/src/application/repositories/IAchievementRepository';

// Master achievement data
const ACHIEVEMENTS: Achievement[] = [
  // Battle Achievements
  {
    id: 'battle-first-win',
    name: 'First Victory',
    description: 'Win your first battle',
    icon: '🏆',
    category: 'battle',
    rarity: 'common',
    points: 10,
    maxProgress: 1,
    requirement: 'Win 1 battle',
    reward: { type: 'coins', amount: 100 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'battle-10-wins',
    name: 'Rising Warrior',
    description: 'Win 10 battles',
    icon: '⚔️',
    category: 'battle',
    rarity: 'common',
    points: 25,
    maxProgress: 10,
    requirement: 'Win 10 battles',
    reward: { type: 'coins', amount: 250 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'battle-50-wins',
    name: 'Battle Hardened',
    description: 'Win 50 battles',
    icon: '🗡️',
    category: 'battle',
    rarity: 'uncommon',
    points: 50,
    maxProgress: 50,
    requirement: 'Win 50 battles',
    reward: { type: 'coins', amount: 500 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'battle-100-wins',
    name: 'Champion',
    description: 'Win 100 battles',
    icon: '👑',
    category: 'battle',
    rarity: 'rare',
    points: 100,
    maxProgress: 100,
    requirement: 'Win 100 battles',
    reward: { type: 'gems', amount: 50 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'battle-perfect',
    name: 'Flawless Victory',
    description: 'Win a battle without taking any damage',
    icon: '💎',
    category: 'battle',
    rarity: 'epic',
    points: 150,
    maxProgress: 1,
    requirement: 'Win with full HP',
    reward: { type: 'title', itemId: 'title-flawless' },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'battle-streak-5',
    name: 'On Fire',
    description: 'Win 5 battles in a row',
    icon: '🔥',
    category: 'battle',
    rarity: 'uncommon',
    points: 40,
    maxProgress: 5,
    requirement: '5 win streak',
    reward: { type: 'coins', amount: 300 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'battle-streak-10',
    name: 'Unstoppable',
    description: 'Win 10 battles in a row',
    icon: '🌟',
    category: 'battle',
    rarity: 'rare',
    points: 80,
    maxProgress: 10,
    requirement: '10 win streak',
    reward: { type: 'gems', amount: 30 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'battle-comeback',
    name: 'Never Give Up',
    description: 'Win a battle with less than 10% HP remaining',
    icon: '💪',
    category: 'battle',
    rarity: 'rare',
    points: 75,
    maxProgress: 1,
    requirement: 'Comeback victory',
    reward: { type: 'title', itemId: 'title-survivor' },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  
  // Collection Achievements
  {
    id: 'collect-5-characters',
    name: 'Team Builder',
    description: 'Collect 5 different characters',
    icon: '👥',
    category: 'collection',
    rarity: 'common',
    points: 20,
    maxProgress: 5,
    requirement: 'Own 5 characters',
    reward: { type: 'coins', amount: 200 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'collect-all-elements',
    name: 'Elemental Master',
    description: 'Collect one character of each element',
    icon: '🌈',
    category: 'collection',
    rarity: 'rare',
    points: 75,
    maxProgress: 6,
    requirement: 'One per element',
    reward: { type: 'gems', amount: 25 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'collect-rare',
    name: 'Lucky Find',
    description: 'Collect a rare character',
    icon: '🌟',
    category: 'collection',
    rarity: 'uncommon',
    points: 30,
    maxProgress: 1,
    requirement: 'Own 1 rare character',
    reward: { type: 'coins', amount: 300 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'collect-legendary',
    name: 'Legend Hunter',
    description: 'Collect a legendary character',
    icon: '👑',
    category: 'collection',
    rarity: 'epic',
    points: 100,
    maxProgress: 1,
    requirement: 'Own 1 legendary character',
    reward: { type: 'gems', amount: 50 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  
  // Mastery Achievements
  {
    id: 'mastery-level-10',
    name: 'Apprentice',
    description: 'Reach level 10',
    icon: '📈',
    category: 'mastery',
    rarity: 'common',
    points: 15,
    maxProgress: 10,
    requirement: 'Reach level 10',
    reward: { type: 'coins', amount: 150 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'mastery-level-25',
    name: 'Journeyman',
    description: 'Reach level 25',
    icon: '🎯',
    category: 'mastery',
    rarity: 'uncommon',
    points: 35,
    maxProgress: 25,
    requirement: 'Reach level 25',
    reward: { type: 'coins', amount: 350 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'mastery-level-50',
    name: 'Expert',
    description: 'Reach level 50',
    icon: '⭐',
    category: 'mastery',
    rarity: 'rare',
    points: 75,
    maxProgress: 50,
    requirement: 'Reach level 50',
    reward: { type: 'gems', amount: 40 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'mastery-combo-20',
    name: 'Combo Master',
    description: 'Achieve a 20-hit combo',
    icon: '💥',
    category: 'mastery',
    rarity: 'rare',
    points: 60,
    maxProgress: 20,
    requirement: '20-hit combo',
    reward: { type: 'title', itemId: 'title-combo' },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'mastery-max-character',
    name: 'True Dedication',
    description: 'Max out a character\'s level',
    icon: '🏅',
    category: 'mastery',
    rarity: 'epic',
    points: 120,
    maxProgress: 1,
    requirement: 'Max level character',
    reward: { type: 'gems', amount: 75 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  
  // Social Achievements
  {
    id: 'social-first-friend',
    name: 'Friendly',
    description: 'Add your first friend',
    icon: '🤝',
    category: 'social',
    rarity: 'common',
    points: 10,
    maxProgress: 1,
    requirement: 'Add 1 friend',
    reward: { type: 'coins', amount: 100 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'social-10-friends',
    name: 'Social Butterfly',
    description: 'Add 10 friends',
    icon: '💫',
    category: 'social',
    rarity: 'uncommon',
    points: 30,
    maxProgress: 10,
    requirement: 'Add 10 friends',
    reward: { type: 'coins', amount: 250 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'social-gift-sent',
    name: 'Generous',
    description: 'Send a gift to a friend',
    icon: '🎁',
    category: 'social',
    rarity: 'common',
    points: 10,
    maxProgress: 1,
    requirement: 'Send 1 gift',
    reward: { type: 'coins', amount: 50 },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  
  // Special/Secret Achievements
  {
    id: 'special-early-bird',
    name: 'Early Bird',
    description: 'Play during the launch week',
    icon: '🐦',
    category: 'special',
    rarity: 'rare',
    points: 50,
    maxProgress: 1,
    requirement: 'Play during launch',
    reward: { type: 'badge', itemId: 'badge-early' },
    isSecret: false,
    createdAt: '2024-01-01',
  },
  {
    id: 'special-hidden-boss',
    name: '???',
    description: 'Defeat the hidden boss',
    icon: '❓',
    category: 'special',
    rarity: 'legendary',
    points: 200,
    maxProgress: 1,
    requirement: 'Unknown',
    reward: { type: 'character', itemId: 'hero-secret' },
    isSecret: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'special-1000-battles',
    name: 'Eternal Warrior',
    description: 'Participate in 1000 battles',
    icon: '🗿',
    category: 'battle',
    rarity: 'legendary',
    points: 250,
    maxProgress: 1000,
    requirement: 'Fight 1000 battles',
    reward: { type: 'title', itemId: 'title-eternal' },
    isSecret: false,
    createdAt: '2024-01-01',
  },
];

// Generate mock user progress
const generateUserProgress = (): Map<string, { progress: number; unlocked: boolean; unlockedAt: string | null }> => {
  const progressMap = new Map();
  
  ACHIEVEMENTS.forEach((achievement) => {
    const randomProgress = Math.floor(Math.random() * (achievement.maxProgress + 1));
    const isUnlocked = randomProgress >= achievement.maxProgress || Math.random() > 0.7;
    
    progressMap.set(achievement.id, {
      progress: isUnlocked ? achievement.maxProgress : randomProgress,
      unlocked: isUnlocked,
      unlockedAt: isUnlocked 
        ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() 
        : null,
    });
  });
  
  return progressMap;
};

export class MockAchievementRepository implements IAchievementRepository {
  private userProgress: Map<string, { progress: number; unlocked: boolean; unlockedAt: string | null }>;

  constructor() {
    this.userProgress = generateUserProgress();
  }

  private combineWithProgress(achievement: Achievement): AchievementWithProgress {
    const progress = this.userProgress.get(achievement.id) || {
      progress: 0,
      unlocked: false,
      unlockedAt: null,
    };

    return {
      ...achievement,
      userProgress: progress.progress,
      isUnlocked: progress.unlocked,
      unlockedAt: progress.unlockedAt,
      progressPercent: Math.round((progress.progress / achievement.maxProgress) * 100),
    };
  }

  async getAchievements(profileId: string, filters?: AchievementFilters): Promise<AchievementWithProgress[]> {
    await this.delay(150);

    let achievements = ACHIEVEMENTS.map((a) => this.combineWithProgress(a));

    // Apply filters
    if (filters?.category) {
      achievements = achievements.filter((a) => a.category === filters.category);
    }
    if (filters?.rarity) {
      achievements = achievements.filter((a) => a.rarity === filters.rarity);
    }
    if (filters?.unlockedOnly) {
      achievements = achievements.filter((a) => a.isUnlocked);
    }
    if (filters?.lockedOnly) {
      achievements = achievements.filter((a) => !a.isUnlocked);
    }

    // Hide secret achievements that are locked
    achievements = achievements.filter((a) => !a.isSecret || a.isUnlocked);

    return achievements;
  }

  async getAchievementById(achievementId: string, profileId: string): Promise<AchievementWithProgress | null> {
    await this.delay(50);
    
    const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
    if (!achievement) return null;
    
    return this.combineWithProgress(achievement);
  }

  async getStats(profileId: string): Promise<AchievementStats> {
    await this.delay(100);

    const achievements = await this.getAchievements(profileId);
    const allAchievements = ACHIEVEMENTS.map((a) => this.combineWithProgress(a));

    const totalAchievements = allAchievements.length;
    const unlockedCount = allAchievements.filter((a) => a.isUnlocked).length;
    const totalPoints = allAchievements.reduce((sum, a) => sum + a.points, 0);
    const earnedPoints = allAchievements
      .filter((a) => a.isUnlocked)
      .reduce((sum, a) => sum + a.points, 0);

    const categories: AchievementCategory[] = ['battle', 'collection', 'social', 'mastery', 'special'];
    const rarities: AchievementRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

    const byCategory = {} as Record<AchievementCategory, { total: number; unlocked: number }>;
    categories.forEach((cat) => {
      const catAchievements = allAchievements.filter((a) => a.category === cat);
      byCategory[cat] = {
        total: catAchievements.length,
        unlocked: catAchievements.filter((a) => a.isUnlocked).length,
      };
    });

    const byRarity = {} as Record<AchievementRarity, { total: number; unlocked: number }>;
    rarities.forEach((rarity) => {
      const rarityAchievements = allAchievements.filter((a) => a.rarity === rarity);
      byRarity[rarity] = {
        total: rarityAchievements.length,
        unlocked: rarityAchievements.filter((a) => a.isUnlocked).length,
      };
    });

    return {
      totalAchievements,
      unlockedCount,
      totalPoints,
      earnedPoints,
      completionPercent: Math.round((unlockedCount / totalAchievements) * 100),
      byCategory,
      byRarity,
    };
  }

  async getRecentUnlocks(profileId: string, limit: number): Promise<AchievementWithProgress[]> {
    await this.delay(50);

    const achievements = await this.getAchievements(profileId, { unlockedOnly: true });
    
    return achievements
      .filter((a) => a.unlockedAt)
      .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
      .slice(0, limit);
  }

  async updateProgress(profileId: string, achievementId: string, progress: number): Promise<void> {
    await this.delay(50);
    
    const current = this.userProgress.get(achievementId);
    if (current && !current.unlocked) {
      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
      const newProgress = Math.min(progress, achievement?.maxProgress || progress);
      const isNowUnlocked = newProgress >= (achievement?.maxProgress || Infinity);
      
      this.userProgress.set(achievementId, {
        progress: newProgress,
        unlocked: isNowUnlocked,
        unlockedAt: isNowUnlocked ? new Date().toISOString() : null,
      });
    }
  }

  async unlockAchievement(profileId: string, achievementId: string): Promise<void> {
    await this.delay(50);
    
    const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
    if (achievement) {
      this.userProgress.set(achievementId, {
        progress: achievement.maxProgress,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      });
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const mockAchievementRepository = new MockAchievementRepository();
