'use client';

import { useCallback, useEffect, useState } from 'react';
import { MatchHistoryViewModel, MatchResultFilter, MatchTypeFilter } from './MatchHistoryPresenter';
import { createClientMatchHistoryPresenter } from './MatchHistoryPresenterClientFactory';

export interface MatchHistoryPresenterState {
  viewModel: MatchHistoryViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface MatchHistoryPresenterActions {
  loadData: () => Promise<void>;
  setTypeFilter: (filter: MatchTypeFilter) => void;
  setResultFilter: (filter: MatchResultFilter) => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for MatchHistory presenter
 * Provides state management and actions for MatchHistory page
 */
export function useMatchHistoryPresenter(
  initialViewModel?: MatchHistoryViewModel,
  profileId?: string
): [MatchHistoryPresenterState, MatchHistoryPresenterActions] {
  const [presenter] = useState(() => createClientMatchHistoryPresenter(profileId));
  const [viewModel, setViewModel] = useState<MatchHistoryViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  // Local filter states
  const [typeFilter, setTypeFilterState] = useState<MatchTypeFilter>('all');
  const [resultFilter, setResultFilterState] = useState<MatchResultFilter>('all');

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
      console.error('Error loading match history:', err);
    } finally {
      setLoading(false);
    }
  }, [presenter]);

  /**
   * Set type filter and update filtered matches
   */
  const setTypeFilter = useCallback((filter: MatchTypeFilter) => {
    setTypeFilterState(filter);
    if (viewModel) {
      const filtered = presenter.filterMatches(filter, resultFilter);
      setViewModel({
        ...viewModel,
        filteredMatches: filtered,
        typeFilter: filter,
      });
    }
  }, [presenter, viewModel, resultFilter]);

  /**
   * Set result filter and update filtered matches
   */
  const setResultFilter = useCallback((filter: MatchResultFilter) => {
    setResultFilterState(filter);
    if (viewModel) {
      const filtered = presenter.filterMatches(typeFilter, filter);
      setViewModel({
        ...viewModel,
        filteredMatches: filtered,
        resultFilter: filter,
      });
    }
  }, [presenter, viewModel, typeFilter]);

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
      setTypeFilter,
      setResultFilter,
      setError,
    },
  ];
}
