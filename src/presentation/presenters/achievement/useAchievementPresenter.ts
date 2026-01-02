/**
 * useAchievementPresenter Hook
 * React hook for managing achievement state and interactions
 */

'use client';

import { AchievementCategory, AchievementFilters, AchievementRarity } from '@/src/application/repositories/IAchievementRepository';
import { MockAchievementRepository } from '@/src/infrastructure/repositories/mock/MockAchievementRepository';
import { useCallback, useEffect, useState } from 'react';
import {
    AchievementPresenter,
    AchievementViewModel,
} from './AchievementPresenter';

interface UseAchievementPresenterOptions {
  initialViewModel?: AchievementViewModel;
  profileId?: string;
}

interface UseAchievementPresenterReturn extends AchievementViewModel {
  presenter: AchievementPresenter;
  filterByCategory: (category: AchievementCategory | null) => Promise<void>;
  filterByRarity: (rarity: AchievementRarity | null) => Promise<void>;
  showUnlockedOnly: (value: boolean) => Promise<void>;
  showLockedOnly: (value: boolean) => Promise<void>;
  clearFilters: () => Promise<void>;
  refreshAchievements: () => Promise<void>;
}

// Singleton presenter
const repository = new MockAchievementRepository();
const presenter = new AchievementPresenter(repository);

export function useAchievementPresenter(
  options: UseAchievementPresenterOptions = {}
): UseAchievementPresenterReturn {
  const { initialViewModel, profileId = 'default-user' } = options;

  const [viewModel, setViewModel] = useState<AchievementViewModel>(
    initialViewModel || {
      achievements: [],
      stats: {
        totalAchievements: 0,
        unlockedCount: 0,
        totalPoints: 0,
        earnedPoints: 0,
        completionPercent: 0,
        byCategory: {} as AchievementViewModel['stats']['byCategory'],
        byRarity: {} as AchievementViewModel['stats']['byRarity'],
      },
      recentUnlocks: [],
      currentFilter: {},
      isLoading: true,
      error: null,
    }
  );

  const [currentFilters, setCurrentFilters] = useState<AchievementFilters>({});

  const loadAchievements = useCallback(async (filters: AchievementFilters) => {
    setViewModel((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const newViewModel = await presenter.getViewModel(profileId, filters);
      setViewModel(newViewModel);
      setCurrentFilters(filters);
    } catch (error) {
      setViewModel((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load achievements',
      }));
    }
  }, [profileId]);

  const filterByCategory = useCallback(async (category: AchievementCategory | null) => {
    const newFilters = { ...currentFilters };
    if (category) {
      newFilters.category = category;
    } else {
      delete newFilters.category;
    }
    await loadAchievements(newFilters);
  }, [currentFilters, loadAchievements]);

  const filterByRarity = useCallback(async (rarity: AchievementRarity | null) => {
    const newFilters = { ...currentFilters };
    if (rarity) {
      newFilters.rarity = rarity;
    } else {
      delete newFilters.rarity;
    }
    await loadAchievements(newFilters);
  }, [currentFilters, loadAchievements]);

  const showUnlockedOnly = useCallback(async (value: boolean) => {
    const newFilters = { ...currentFilters };
    if (value) {
      newFilters.unlockedOnly = true;
      delete newFilters.lockedOnly;
    } else {
      delete newFilters.unlockedOnly;
    }
    await loadAchievements(newFilters);
  }, [currentFilters, loadAchievements]);

  const showLockedOnly = useCallback(async (value: boolean) => {
    const newFilters = { ...currentFilters };
    if (value) {
      newFilters.lockedOnly = true;
      delete newFilters.unlockedOnly;
    } else {
      delete newFilters.lockedOnly;
    }
    await loadAchievements(newFilters);
  }, [currentFilters, loadAchievements]);

  const clearFilters = useCallback(async () => {
    await loadAchievements({});
  }, [loadAchievements]);

  const refreshAchievements = useCallback(async () => {
    await loadAchievements(currentFilters);
  }, [loadAchievements, currentFilters]);

  // Load initial data
  useEffect(() => {
    if (!initialViewModel) {
      loadAchievements({});
    }
  }, [initialViewModel, loadAchievements]);

  return {
    ...viewModel,
    presenter,
    filterByCategory,
    filterByRarity,
    showUnlockedOnly,
    showLockedOnly,
    clearFilters,
    refreshAchievements,
  };
}
