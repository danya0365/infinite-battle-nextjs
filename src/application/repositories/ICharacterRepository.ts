/**
 * ICharacterRepository
 * Repository interface for Character data access
 * Following Clean Architecture - this is in the Application layer
 */

import { CharacterMaster } from '@/src/data/master/characters';

export interface CharacterStats {
  totalCharacters: number;
  legendaryCount: number;
  epicCount: number;
  rareCount: number;
  commonCount: number;
  byElement: Record<string, number>;
}

export interface CharacterFilters {
  element?: string;
  rarity?: string;
  searchQuery?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface ICharacterRepository {
  /**
   * Get character by ID
   */
  getById(id: string): Promise<CharacterMaster | null>;

  /**
   * Get all characters
   */
  getAll(): Promise<CharacterMaster[]>;

  /**
   * Get characters with filters
   */
  getFiltered(filters: CharacterFilters): Promise<CharacterMaster[]>;

  /**
   * Get paginated characters
   */
  getPaginated(page: number, perPage: number, filters?: CharacterFilters): Promise<PaginatedResult<CharacterMaster>>;

  /**
   * Get characters by element
   */
  getByElement(element: string): Promise<CharacterMaster[]>;

  /**
   * Get characters by rarity
   */
  getByRarity(rarity: string): Promise<CharacterMaster[]>;

  /**
   * Get character statistics
   */
  getStats(): Promise<CharacterStats>;

  /**
   * Search characters by name
   */
  searchByName(query: string): Promise<CharacterMaster[]>;
}
