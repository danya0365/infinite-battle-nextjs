'use client';

import { useCallback, useEffect, useState } from 'react';
import { ProfileViewModel } from './ProfilePresenter';
import { createClientProfilePresenter } from './ProfilePresenterClientFactory';

export interface ProfilePresenterState {
  viewModel: ProfileViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface ProfilePresenterActions {
  loadData: () => Promise<void>;
  switchProfile: (profileId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Profile presenter
 * Provides state management and actions for Profile page
 */
export function useProfilePresenter(
  initialViewModel?: ProfileViewModel,
  userId?: string
): [ProfilePresenterState, ProfilePresenterActions] {
  const [presenter] = useState(() => createClientProfilePresenter(userId));
  const [viewModel, setViewModel] = useState<ProfileViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

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
      console.error('Error loading profile data:', err);
    } finally {
      setLoading(false);
    }
  }, [presenter]);

  /**
   * Switch to a different profile
   */
  const switchProfile = useCallback(async (profileId: string) => {
    setLoading(true);
    setError(null);

    try {
      const newProfile = await presenter.switchProfile(profileId);
      if (newProfile && viewModel) {
        setViewModel({
          ...viewModel,
          currentProfile: newProfile,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to switch profile';
      setError(errorMessage);
      console.error('Error switching profile:', err);
    } finally {
      setLoading(false);
    }
  }, [presenter, viewModel]);

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
      switchProfile,
      setError,
    },
  ];
}
