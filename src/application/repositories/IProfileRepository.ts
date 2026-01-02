/**
 * IProfileRepository
 * Repository interface for Profile data access
 * Following Clean Architecture - this is in the Application layer
 */

import { MockProfile } from '@/src/data/mock/profiles';

export interface ProfileStats {
  totalProfiles: number;
  totalWins: number;
  totalLosses: number;
  totalMatches: number;
  averageWinRate: number;
}

export interface ProfileFilters {
  userId?: string;
  searchQuery?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface CreateProfileData {
  userId: string;
  displayName: string;
  avatar?: string;
}

export interface UpdateProfileData {
  displayName?: string;
  avatar?: string;
  selectedCharacters?: string[];
  settings?: {
    soundEnabled?: boolean;
    musicEnabled?: boolean;
    notificationsEnabled?: boolean;
  };
}

export interface IProfileRepository {
  /**
   * Get profile by ID
   */
  getById(id: string): Promise<MockProfile | null>;

  /**
   * Get all profiles
   */
  getAll(): Promise<MockProfile[]>;

  /**
   * Get profiles by user ID
   */
  getByUserId(userId: string): Promise<MockProfile[]>;

  /**
   * Get paginated profiles
   */
  getPaginated(page: number, perPage: number): Promise<PaginatedResult<MockProfile>>;

  /**
   * Create a new profile
   */
  create(data: CreateProfileData): Promise<MockProfile>;

  /**
   * Update an existing profile
   */
  update(id: string, data: UpdateProfileData): Promise<MockProfile>;

  /**
   * Delete a profile
   */
  delete(id: string): Promise<boolean>;

  /**
   * Get profile statistics
   */
  getStats(): Promise<ProfileStats>;

  /**
   * Add experience points to profile
   */
  addExperience(id: string, exp: number): Promise<MockProfile>;

  /**
   * Update profile rank
   */
  updateRank(id: string, rank: string): Promise<MockProfile>;
}
