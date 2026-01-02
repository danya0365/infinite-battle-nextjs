/**
 * RosterPresenter
 * Handles business logic for the character roster page
 */

import { CharacterMaster, CHARACTERS, getCharactersByElement, getCharactersByRarity } from '@/src/data/master/characters';

export type ElementFilter = 'all' | 'light' | 'dark' | 'fire' | 'water' | 'earth' | 'wind';
export type RarityFilter = 'all' | 'legendary' | 'epic' | 'rare' | 'common';

export interface RosterViewModel {
  characters: CharacterMaster[];
  filteredCharacters: CharacterMaster[];
  selectedCharacter: CharacterMaster | null;
  elementFilter: ElementFilter;
  rarityFilter: RarityFilter;
  searchQuery: string;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

export class RosterPresenter {
  private characters: CharacterMaster[];
  private elementFilter: ElementFilter = 'all';
  private rarityFilter: RarityFilter = 'all';
  private searchQuery: string = '';

  constructor() {
    this.characters = CHARACTERS;
  }

  /**
   * Get view model for the roster page
   */
  async getViewModel(): Promise<RosterViewModel> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const filteredCharacters = this.applyFilters();

    return {
      characters: this.characters,
      filteredCharacters,
      selectedCharacter: null,
      elementFilter: this.elementFilter,
      rarityFilter: this.rarityFilter,
      searchQuery: this.searchQuery,
      totalCount: this.characters.length,
      isLoading: false,
      error: null,
    };
  }

  /**
   * Apply all filters to characters
   */
  private applyFilters(): CharacterMaster[] {
    let result = [...this.characters];

    // Filter by element
    if (this.elementFilter !== 'all') {
      result = result.filter((c) => c.element === this.elementFilter);
    }

    // Filter by rarity
    if (this.rarityFilter !== 'all') {
      result = result.filter((c) => c.rarity === this.rarityFilter);
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.displayName.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    return result;
  }

  /**
   * Get character by ID
   */
  async getCharacterById(characterId: string): Promise<CharacterMaster | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return this.characters.find((c) => c.id === characterId) || null;
  }

  /**
   * Get characters by element
   */
  async getCharactersByElement(element: string): Promise<CharacterMaster[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return getCharactersByElement(element);
  }

  /**
   * Get characters by rarity
   */
  async getCharactersByRarity(rarity: string): Promise<CharacterMaster[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return getCharactersByRarity(rarity);
  }

  /**
   * Update filters
   */
  setFilters(
    elementFilter: ElementFilter,
    rarityFilter: RarityFilter,
    searchQuery: string
  ): void {
    this.elementFilter = elementFilter;
    this.rarityFilter = rarityFilter;
    this.searchQuery = searchQuery;
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: 'Character Roster - Infinite Battle',
      description: 'Explore all available characters in Infinite Battle. View stats, skills, and abilities.',
    };
  }
}
