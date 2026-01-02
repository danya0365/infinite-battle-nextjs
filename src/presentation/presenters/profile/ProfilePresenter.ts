/**
 * ProfilePresenter
 * Handles business logic for the profile page
 */

import { MockMatch, getMockMatchesByProfileId } from '@/src/data/mock/matches';
import { MOCK_PROFILES, MockProfile, getMockProfilesByUserId } from '@/src/data/mock/profiles';
import { CURRENT_MOCK_USER, MOCK_USERS, MockUser } from '@/src/data/mock/users';

export interface ProfileStats {
  totalMatches: number;
  wins: number;
  losses: number;
  winRate: number;
  avgDamageDealt: number;
  avgCombo: number;
  highestCombo: number;
}

export interface ProfileViewModel {
  user: MockUser | null;
  profiles: MockProfile[];
  currentProfile: MockProfile | null;
  recentMatches: MockMatch[];
  stats: ProfileStats;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export class ProfilePresenter {
  private userId: string;

  constructor(userId?: string) {
    this.userId = userId || CURRENT_MOCK_USER.id;
  }

  /**
   * Get view model for the profile page
   */
  async getViewModel(): Promise<ProfileViewModel> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const user = MOCK_USERS.find((u) => u.id === this.userId) || null;
    const profiles = user ? getMockProfilesByUserId(user.id) : [];
    const currentProfile = profiles.length > 0 ? profiles[0] : null;
    const recentMatches = currentProfile
      ? getMockMatchesByProfileId(currentProfile.id).slice(0, 5)
      : [];

    const stats = this.calculateStats(recentMatches);

    return {
      user,
      profiles,
      currentProfile,
      recentMatches,
      stats,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    };
  }

  /**
   * Calculate profile statistics from matches
   */
  private calculateStats(matches: MockMatch[]): ProfileStats {
    if (matches.length === 0) {
      return {
        totalMatches: 0,
        wins: 0,
        losses: 0,
        winRate: 0,
        avgDamageDealt: 0,
        avgCombo: 0,
        highestCombo: 0,
      };
    }

    const wins = matches.filter((m) => m.result === 'win').length;
    const losses = matches.filter((m) => m.result === 'loss').length;
    const totalDamage = matches.reduce((acc, m) => acc + m.stats.damageDealt, 0);
    const highestCombo = Math.max(...matches.map((m) => m.stats.highestCombo));
    const avgCombo = matches.reduce((acc, m) => acc + m.stats.highestCombo, 0) / matches.length;

    return {
      totalMatches: matches.length,
      wins,
      losses,
      winRate: Math.round((wins / matches.length) * 100),
      avgDamageDealt: Math.round(totalDamage / matches.length),
      avgCombo: Math.round(avgCombo),
      highestCombo,
    };
  }

  /**
   * Get profile by ID
   */
  async getProfileById(profileId: string): Promise<MockProfile | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_PROFILES.find((p) => p.id === profileId) || null;
  }

  /**
   * Switch active profile
   */
  async switchProfile(profileId: string): Promise<MockProfile | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const profile = MOCK_PROFILES.find((p) => p.id === profileId);
    return profile || null;
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: 'Profile - Infinite Battle',
      description: 'View and manage your Infinite Battle profile, stats, and match history.',
    };
  }
}
