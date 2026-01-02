/**
 * MockProfileRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - this is in the Infrastructure layer
 */

import {
    CreateProfileData,
    IProfileRepository,
    PaginatedResult,
    ProfileStats,
    UpdateProfileData,
} from '@/src/application/repositories/IProfileRepository';
import { MOCK_PROFILES, MockProfile } from '@/src/data/mock/profiles';

export class MockProfileRepository implements IProfileRepository {
  private profiles: MockProfile[] = [...MOCK_PROFILES];

  async getById(id: string): Promise<MockProfile | null> {
    await this.delay(50);
    return this.profiles.find((profile) => profile.id === id) || null;
  }

  async getAll(): Promise<MockProfile[]> {
    await this.delay(100);
    return [...this.profiles];
  }

  async getByUserId(userId: string): Promise<MockProfile[]> {
    await this.delay(100);
    return this.profiles.filter((profile) => profile.userId === userId);
  }

  async getPaginated(page: number, perPage: number): Promise<PaginatedResult<MockProfile>> {
    await this.delay(100);

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedItems = this.profiles.slice(start, end);

    return {
      data: paginatedItems,
      total: this.profiles.length,
      page,
      perPage,
    };
  }

  async create(data: CreateProfileData): Promise<MockProfile> {
    await this.delay(200);

    const newProfile: MockProfile = {
      id: `profile-${Date.now()}`,
      userId: data.userId,
      displayName: data.displayName,
      avatar: data.avatar || '/images/avatars/default.png',
      level: 1,
      experience: 0,
      rank: 'Bronze',
      rankPoints: 0,
      wins: 0,
      losses: 0,
      winStreak: 0,
      bestWinStreak: 0,
      totalMatches: 0,
      favoriteCharacter: null,
      selectedCharacters: [],
      unlockedCharacters: ['hero-01', 'hero-06'],
      achievements: [],
      settings: {
        soundEnabled: true,
        musicEnabled: true,
        notificationsEnabled: true,
      },
      createdAt: new Date().toISOString(),
      lastPlayedAt: new Date().toISOString(),
    };

    this.profiles.unshift(newProfile);
    return newProfile;
  }

  async update(id: string, data: UpdateProfileData): Promise<MockProfile> {
    await this.delay(200);

    const index = this.profiles.findIndex((profile) => profile.id === id);
    if (index === -1) {
      throw new Error('Profile not found');
    }

    const updatedProfile: MockProfile = {
      ...this.profiles[index],
      ...data,
      settings: data.settings
        ? { ...this.profiles[index].settings, ...data.settings }
        : this.profiles[index].settings,
      lastPlayedAt: new Date().toISOString(),
    };

    this.profiles[index] = updatedProfile;
    return updatedProfile;
  }

  async delete(id: string): Promise<boolean> {
    await this.delay(200);

    const index = this.profiles.findIndex((profile) => profile.id === id);
    if (index === -1) {
      return false;
    }

    this.profiles.splice(index, 1);
    return true;
  }

  async getStats(): Promise<ProfileStats> {
    await this.delay(50);

    const totalProfiles = this.profiles.length;
    const totalWins = this.profiles.reduce((sum, p) => sum + p.wins, 0);
    const totalLosses = this.profiles.reduce((sum, p) => sum + p.losses, 0);
    const totalMatches = this.profiles.reduce((sum, p) => sum + p.totalMatches, 0);
    const averageWinRate =
      totalMatches > 0 ? Math.round((totalWins / totalMatches) * 100) : 0;

    return {
      totalProfiles,
      totalWins,
      totalLosses,
      totalMatches,
      averageWinRate,
    };
  }

  async addExperience(id: string, exp: number): Promise<MockProfile> {
    await this.delay(100);

    const index = this.profiles.findIndex((profile) => profile.id === id);
    if (index === -1) {
      throw new Error('Profile not found');
    }

    const profile = this.profiles[index];
    let newExp = profile.experience + exp;
    let newLevel = profile.level;

    // Level up calculation (100 exp per level)
    const expPerLevel = 100;
    while (newExp >= expPerLevel) {
      newExp -= expPerLevel;
      newLevel++;
    }

    const updatedProfile: MockProfile = {
      ...profile,
      experience: newExp,
      level: newLevel,
      lastPlayedAt: new Date().toISOString(),
    };

    this.profiles[index] = updatedProfile;
    return updatedProfile;
  }

  async updateRank(id: string, rank: string): Promise<MockProfile> {
    await this.delay(100);

    const index = this.profiles.findIndex((profile) => profile.id === id);
    if (index === -1) {
      throw new Error('Profile not found');
    }

    const updatedProfile: MockProfile = {
      ...this.profiles[index],
      rank,
      lastPlayedAt: new Date().toISOString(),
    };

    this.profiles[index] = updatedProfile;
    return updatedProfile;
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance for convenience
export const mockProfileRepository = new MockProfileRepository();
