/**
 * useLeaderboardPresenter Hook
 * React hook for managing leaderboard state and interactions
 */

'use client';

import { LeaderboardType } from '@/src/application/repositories/ILeaderboardRepository';
import { useCallback, useEffect, useState } from 'react';
import {
    LeaderboardPresenter,
    LeaderboardViewModel,
} from './LeaderboardPresenter';
import { createClientLeaderboardPresenter } from './LeaderboardPresenterClientFactory';

interface UseLeaderboardPresenterOptions {
  initialViewModel?: LeaderboardViewModel;
}

interface UseLeaderboardPresenterReturn extends LeaderboardViewModel {
  presenter: LeaderboardPresenter;
  changeType: (type: LeaderboardType) => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
  getRankMedal: (rank: number) => string;
  getRankTierColor: (tier: string) => string;
  getRankTierGradient: (tier: string) => string;
  formatNumber: (num: number) => string;
  getTypeLabel: (type: LeaderboardType) => string;
}

// Singleton presenter
const presenter = createClientLeaderboardPresenter();

export function useLeaderboardPresenter(
  options: UseLeaderboardPresenterOptions = {}
): UseLeaderboardPresenterReturn {
  const { initialViewModel } = options;

  const [viewModel, setViewModel] = useState<LeaderboardViewModel>(
    initialViewModel || {
      entries: [],
      stats: {
        totalPlayers: 0,
        totalMatches: 0,
        averageWinRate: 0,
        topWinStreak: 0,
      },
      currentType: 'ranked',
      isLoading: true,
      error: null,
      currentPlayerRank: null,
    }
  );

  const loadLeaderboard = useCallback(async (type: LeaderboardType) => {
    setViewModel((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const newViewModel = await presenter.getViewModel(type);
      setViewModel(newViewModel);
    } catch (error) {
      setViewModel((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load leaderboard',
      }));
    }
  }, []);

  const changeType = useCallback(async (type: LeaderboardType) => {
    await loadLeaderboard(type);
  }, [loadLeaderboard]);

  const refreshLeaderboard = useCallback(async () => {
    await loadLeaderboard(viewModel.currentType);
  }, [loadLeaderboard, viewModel.currentType]);

  // Load initial data if not provided
  useEffect(() => {
    if (!initialViewModel) {
      loadLeaderboard('ranked');
    }
  }, [initialViewModel, loadLeaderboard]);

  return {
    ...viewModel,
    presenter,
    changeType,
    refreshLeaderboard,
    getRankMedal: presenter.getRankMedal.bind(presenter),
    getRankTierColor: presenter.getRankTierColor.bind(presenter),
    getRankTierGradient: presenter.getRankTierGradient.bind(presenter),
    formatNumber: presenter.formatNumber.bind(presenter),
    getTypeLabel: presenter.getTypeLabel.bind(presenter),
  };
}
