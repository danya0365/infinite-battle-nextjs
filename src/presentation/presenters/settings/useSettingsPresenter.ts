/**
 * useSettingsPresenter Hook
 * React hook for managing settings state and actions
 */

'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import {
    SettingsViewModel
} from './SettingsPresenter';
import { createClientSettingsPresenter } from './SettingsPresenterClientFactory';

interface UseSettingsPresenterOptions {
  initialViewModel?: SettingsViewModel;
}

interface UseSettingsPresenterReturn {
  viewModel: SettingsViewModel;
  isLoading: boolean;
  error: string | null;
  hasChanges: boolean;

  // Sound actions
  setMasterVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  toggleSound: () => void;
  toggleMusic: () => void;

  // Display actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLayout: (layout: 'main' | 'retro') => void;
  setLanguage: (language: 'th' | 'en') => void;
  toggleFps: () => void;
  toggleReduceMotion: () => void;

  // Notification actions
  toggleBattleInvites: () => void;
  toggleMatchResults: () => void;
  toggleEvents: () => void;
  toggleNews: () => void;
  togglePushNotifications: () => void;

  // Gameplay actions
  toggleAutoConfirm: () => void;
  toggleDamageNumbers: () => void;
  toggleComboCounter: () => void;
  toggleTutorialHints: () => void;
  toggleConfirmQuit: () => void;

  // Save & Reset
  saveSettings: () => void;
  resetToDefaults: () => void;
  resetSection: (section: 'sound' | 'display' | 'notifications' | 'gameplay') => void;
}

// Singleton presenter
const presenter = createClientSettingsPresenter();

export function useSettingsPresenter(
  options: UseSettingsPresenterOptions = {}
): UseSettingsPresenterReturn {
  const { initialViewModel } = options;

  const [viewModel, setViewModel] = useState<SettingsViewModel>(
    initialViewModel || presenter.getViewModel()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // External stores
  const { layout, setLayout: setStoreLayout } = useLayoutStore();
  const { theme, setTheme: setNextTheme } = useTheme();

  // Sync with external stores on mount
  useEffect(() => {
    setViewModel((prev) => ({
      ...prev,
      display: {
        ...prev.display,
        layout: layout,
        theme: (theme as 'light' | 'dark' | 'system') || 'dark',
      },
    }));
  }, [layout, theme]);

  const updateViewModel = useCallback(() => {
    setViewModel(presenter.getViewModel());
    setHasChanges(true);
  }, []);

  // Sound actions
  const setMasterVolume = useCallback(
    (volume: number) => {
      presenter.setMasterVolume(volume);
      updateViewModel();
    },
    [updateViewModel]
  );

  const setSfxVolume = useCallback(
    (volume: number) => {
      presenter.setSfxVolume(volume);
      updateViewModel();
    },
    [updateViewModel]
  );

  const setMusicVolume = useCallback(
    (volume: number) => {
      presenter.setMusicVolume(volume);
      updateViewModel();
    },
    [updateViewModel]
  );

  const toggleSound = useCallback(() => {
    presenter.toggleSound();
    updateViewModel();
  }, [updateViewModel]);

  const toggleMusic = useCallback(() => {
    presenter.toggleMusic();
    updateViewModel();
  }, [updateViewModel]);

  // Display actions
  const setTheme = useCallback(
    (newTheme: 'light' | 'dark' | 'system') => {
      presenter.setTheme(newTheme);
      setNextTheme(newTheme);
      updateViewModel();
    },
    [setNextTheme, updateViewModel]
  );

  const setLayout = useCallback(
    (newLayout: 'main' | 'retro') => {
      presenter.setLayout(newLayout);
      setStoreLayout(newLayout);
      updateViewModel();
    },
    [setStoreLayout, updateViewModel]
  );

  const setLanguage = useCallback(
    (language: 'th' | 'en') => {
      presenter.setLanguage(language);
      updateViewModel();
    },
    [updateViewModel]
  );

  const toggleFps = useCallback(() => {
    presenter.toggleFps();
    updateViewModel();
  }, [updateViewModel]);

  const toggleReduceMotion = useCallback(() => {
    presenter.toggleReduceMotion();
    updateViewModel();
  }, [updateViewModel]);

  // Notification actions
  const toggleBattleInvites = useCallback(() => {
    presenter.toggleBattleInvites();
    updateViewModel();
  }, [updateViewModel]);

  const toggleMatchResults = useCallback(() => {
    presenter.toggleMatchResults();
    updateViewModel();
  }, [updateViewModel]);

  const toggleEvents = useCallback(() => {
    presenter.updateNotificationSettings({
      events: !viewModel.notifications.events,
    });
    updateViewModel();
  }, [updateViewModel, viewModel.notifications.events]);

  const toggleNews = useCallback(() => {
    presenter.updateNotificationSettings({
      news: !viewModel.notifications.news,
    });
    updateViewModel();
  }, [updateViewModel, viewModel.notifications.news]);

  const togglePushNotifications = useCallback(() => {
    presenter.togglePushNotifications();
    updateViewModel();
  }, [updateViewModel]);

  // Gameplay actions
  const toggleAutoConfirm = useCallback(() => {
    presenter.toggleAutoConfirm();
    updateViewModel();
  }, [updateViewModel]);

  const toggleDamageNumbers = useCallback(() => {
    presenter.toggleDamageNumbers();
    updateViewModel();
  }, [updateViewModel]);

  const toggleComboCounter = useCallback(() => {
    presenter.toggleComboCounter();
    updateViewModel();
  }, [updateViewModel]);

  const toggleTutorialHints = useCallback(() => {
    presenter.updateGameplaySettings({
      tutorialHints: !viewModel.gameplay.tutorialHints,
    });
    updateViewModel();
  }, [updateViewModel, viewModel.gameplay.tutorialHints]);

  const toggleConfirmQuit = useCallback(() => {
    presenter.updateGameplaySettings({
      confirmQuit: !viewModel.gameplay.confirmQuit,
    });
    updateViewModel();
  }, [updateViewModel, viewModel.gameplay.confirmQuit]);

  // Save & Reset
  const saveSettings = useCallback(() => {
    setIsLoading(true);
    try {
      // In a real app, this would save to localStorage or backend
      localStorage.setItem('infinite-battle-settings', JSON.stringify(viewModel));
      setHasChanges(false);
    } catch (err) {
      setError('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  }, [viewModel]);

  const resetToDefaults = useCallback(() => {
    presenter.resetToDefaults();
    setNextTheme('dark');
    setStoreLayout('main');
    updateViewModel();
  }, [setNextTheme, setStoreLayout, updateViewModel]);

  const resetSection = useCallback(
    (section: 'sound' | 'display' | 'notifications' | 'gameplay') => {
      switch (section) {
        case 'sound':
          presenter.resetSoundSettings();
          break;
        case 'display':
          presenter.resetDisplaySettings();
          setNextTheme('dark');
          setStoreLayout('main');
          break;
        case 'notifications':
          presenter.updateNotificationSettings({
            battleInvites: true,
            matchResults: true,
            events: true,
            news: true,
            pushEnabled: true,
          });
          break;
        case 'gameplay':
          presenter.updateGameplaySettings({
            autoConfirm: false,
            showDamageNumbers: true,
            showComboCounter: true,
            tutorialHints: true,
            confirmQuit: true,
          });
          break;
      }
      updateViewModel();
    },
    [setNextTheme, setStoreLayout, updateViewModel]
  );

  // Load saved settings on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('infinite-battle-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        presenter.updateSoundSettings(parsed.sound);
        presenter.updateDisplaySettings(parsed.display);
        presenter.updateNotificationSettings(parsed.notifications);
        presenter.updateGameplaySettings(parsed.gameplay);
        setViewModel(presenter.getViewModel());
      }
    } catch {
      // Ignore parse errors, use defaults
    }
  }, []);

  return {
    viewModel,
    isLoading,
    error,
    hasChanges,
    setMasterVolume,
    setSfxVolume,
    setMusicVolume,
    toggleSound,
    toggleMusic,
    setTheme,
    setLayout,
    setLanguage,
    toggleFps,
    toggleReduceMotion,
    toggleBattleInvites,
    toggleMatchResults,
    toggleEvents,
    toggleNews,
    togglePushNotifications,
    toggleAutoConfirm,
    toggleDamageNumbers,
    toggleComboCounter,
    toggleTutorialHints,
    toggleConfirmQuit,
    saveSettings,
    resetToDefaults,
    resetSection,
  };
}
