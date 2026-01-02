'use client';

import { CharacterMaster } from '@/src/data/master/characters';
import { useCallback, useEffect, useState } from 'react';
import { ElementFilter, RarityFilter, RosterViewModel } from './RosterPresenter';
import { createClientRosterPresenter } from './RosterPresenterClientFactory';

export interface RosterPresenterState {
  viewModel: RosterViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface RosterPresenterActions {
  loadData: () => Promise<void>;
  setElementFilter: (filter: ElementFilter) => void;
  setRarityFilter: (filter: RarityFilter) => void;
  setSearchQuery: (query: string) => void;
  selectCharacter: (character: CharacterMaster | null) => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Roster presenter
 * Provides state management and actions for Roster page
 */
export function useRosterPresenter(
  initialViewModel?: RosterViewModel
): [RosterPresenterState, RosterPresenterActions] {
  const [presenter] = useState(() => createClientRosterPresenter());
  const [viewModel, setViewModel] = useState<RosterViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Local filter states
  const [elementFilter, setElementFilterState] = useState<ElementFilter>('all');
  const [rarityFilter, setRarityFilterState] = useState<RarityFilter>('all');
  const [searchQuery, setSearchQueryState] = useState<string>('');

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error loading roster data:', err);
    } finally {
      setLoading(false);
    }
  }, [presenter]);

  /**
   * Apply filters and update view model
   */
  const applyFilters = useCallback(() => {
    if (!viewModel) return;

    let filtered = [...viewModel.characters];

    // Filter by element
    if (elementFilter !== 'all') {
      filtered = filtered.filter((c) => c.element === elementFilter);
    }

    // Filter by rarity
    if (rarityFilter !== 'all') {
      filtered = filtered.filter((c) => c.rarity === rarityFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.displayName.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    setViewModel((prev) =>
      prev
        ? {
            ...prev,
            filteredCharacters: filtered,
            elementFilter,
            rarityFilter,
            searchQuery,
          }
        : null
    );
  }, [viewModel?.characters, elementFilter, rarityFilter, searchQuery]);

  /**
   * Set element filter
   */
  const setElementFilter = useCallback((filter: ElementFilter) => {
    setElementFilterState(filter);
  }, []);

  /**
   * Set rarity filter
   */
  const setRarityFilter = useCallback((filter: RarityFilter) => {
    setRarityFilterState(filter);
  }, []);

  /**
   * Set search query
   */
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  /**
   * Select a character
   */
  const selectCharacter = useCallback((character: CharacterMaster | null) => {
    setViewModel((prev) =>
      prev ? { ...prev, selectedCharacter: character } : null
    );
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (viewModel) {
      applyFilters();
    }
  }, [elementFilter, rarityFilter, searchQuery]);

  // Load data on mount if no initial data
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      loadData,
      setElementFilter,
      setRarityFilter,
      setSearchQuery,
      selectCharacter,
      setError,
    },
  ];
}
