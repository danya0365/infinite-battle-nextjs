/**
 * MockCharacterRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - this is in the Infrastructure layer
 */

import {
    CharacterFilters,
    CharacterStats,
    ICharacterRepository,
    PaginatedResult,
} from '@/src/application/repositories/ICharacterRepository';
import { CharacterMaster, CHARACTERS } from '@/src/data/master/characters';

export class MockCharacterRepository implements ICharacterRepository {
  private characters: CharacterMaster[] = [...CHARACTERS];

  async getById(id: string): Promise<CharacterMaster | null> {
    await this.delay(50);
    return this.characters.find((char) => char.id === id) || null;
  }

  async getAll(): Promise<CharacterMaster[]> {
    await this.delay(100);
    return [...this.characters];
  }

  async getFiltered(filters: CharacterFilters): Promise<CharacterMaster[]> {
    await this.delay(100);
    
    let result = [...this.characters];

    if (filters.element && filters.element !== 'all') {
      result = result.filter((char) => char.element === filters.element);
    }

    if (filters.rarity && filters.rarity !== 'all') {
      result = result.filter((char) => char.rarity === filters.rarity);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (char) =>
          char.name.toLowerCase().includes(query) ||
          char.displayName.toLowerCase().includes(query)
      );
    }

    return result;
  }

  async getPaginated(
    page: number,
    perPage: number,
    filters?: CharacterFilters
  ): Promise<PaginatedResult<CharacterMaster>> {
    await this.delay(100);

    let filtered = filters ? await this.getFiltered(filters) : [...this.characters];
    
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

  async getByElement(element: string): Promise<CharacterMaster[]> {
    await this.delay(50);
    return this.characters.filter((char) => char.element === element);
  }

  async getByRarity(rarity: string): Promise<CharacterMaster[]> {
    await this.delay(50);
    return this.characters.filter((char) => char.rarity === rarity);
  }

  async getStats(): Promise<CharacterStats> {
    await this.delay(50);

    const stats: CharacterStats = {
      totalCharacters: this.characters.length,
      legendaryCount: 0,
      epicCount: 0,
      rareCount: 0,
      commonCount: 0,
      byElement: {},
    };

    this.characters.forEach((char) => {
      // Count by rarity
      switch (char.rarity) {
        case 'legendary':
          stats.legendaryCount++;
          break;
        case 'epic':
          stats.epicCount++;
          break;
        case 'rare':
          stats.rareCount++;
          break;
        case 'common':
          stats.commonCount++;
          break;
      }

      // Count by element
      stats.byElement[char.element] = (stats.byElement[char.element] || 0) + 1;
    });

    return stats;
  }

  async searchByName(query: string): Promise<CharacterMaster[]> {
    await this.delay(50);
    const lowerQuery = query.toLowerCase();
    return this.characters.filter(
      (char) =>
        char.name.toLowerCase().includes(lowerQuery) ||
        char.displayName.toLowerCase().includes(lowerQuery)
    );
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance for convenience
export const mockCharacterRepository = new MockCharacterRepository();
