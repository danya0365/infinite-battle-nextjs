/**
 * SettingsPresenter
 * Handles settings management and user preferences
 */

import { Metadata } from 'next';

export interface SoundSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface DisplaySettings {
  theme: 'light' | 'dark' | 'system';
  layout: 'main' | 'retro';
  language: 'th' | 'en';
  showFps: boolean;
  reduceMotion: boolean;
}

export interface NotificationSettings {
  battleInvites: boolean;
  matchResults: boolean;
  events: boolean;
  news: boolean;
  pushEnabled: boolean;
}

export interface GameplaySettings {
  autoConfirm: boolean;
  showDamageNumbers: boolean;
  showComboCounter: boolean;
  tutorialHints: boolean;
  confirmQuit: boolean;
}

export interface SettingsViewModel {
  sound: SoundSettings;
  display: DisplaySettings;
  notifications: NotificationSettings;
  gameplay: GameplaySettings;
}

// Default settings
const DEFAULT_SETTINGS: SettingsViewModel = {
  sound: {
    masterVolume: 80,
    sfxVolume: 100,
    musicVolume: 70,
    soundEnabled: true,
    musicEnabled: true,
  },
  display: {
    theme: 'dark',
    layout: 'main',
    language: 'th',
    showFps: false,
    reduceMotion: false,
  },
  notifications: {
    battleInvites: true,
    matchResults: true,
    events: true,
    news: true,
    pushEnabled: true,
  },
  gameplay: {
    autoConfirm: false,
    showDamageNumbers: true,
    showComboCounter: true,
    tutorialHints: true,
    confirmQuit: true,
  },
};

export class SettingsPresenter {
  private settings: SettingsViewModel;

  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
  }

  getViewModel(): SettingsViewModel {
    return { ...this.settings };
  }

  // Sound Settings
  updateSoundSettings(settings: Partial<SoundSettings>): SoundSettings {
    this.settings.sound = { ...this.settings.sound, ...settings };
    return this.settings.sound;
  }

  setMasterVolume(volume: number): void {
    this.settings.sound.masterVolume = Math.max(0, Math.min(100, volume));
  }

  setSfxVolume(volume: number): void {
    this.settings.sound.sfxVolume = Math.max(0, Math.min(100, volume));
  }

  setMusicVolume(volume: number): void {
    this.settings.sound.musicVolume = Math.max(0, Math.min(100, volume));
  }

  toggleSound(): boolean {
    this.settings.sound.soundEnabled = !this.settings.sound.soundEnabled;
    return this.settings.sound.soundEnabled;
  }

  toggleMusic(): boolean {
    this.settings.sound.musicEnabled = !this.settings.sound.musicEnabled;
    return this.settings.sound.musicEnabled;
  }

  // Display Settings
  updateDisplaySettings(settings: Partial<DisplaySettings>): DisplaySettings {
    this.settings.display = { ...this.settings.display, ...settings };
    return this.settings.display;
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    this.settings.display.theme = theme;
  }

  setLayout(layout: 'main' | 'retro'): void {
    this.settings.display.layout = layout;
  }

  setLanguage(language: 'th' | 'en'): void {
    this.settings.display.language = language;
  }

  toggleFps(): boolean {
    this.settings.display.showFps = !this.settings.display.showFps;
    return this.settings.display.showFps;
  }

  toggleReduceMotion(): boolean {
    this.settings.display.reduceMotion = !this.settings.display.reduceMotion;
    return this.settings.display.reduceMotion;
  }

  // Notification Settings
  updateNotificationSettings(settings: Partial<NotificationSettings>): NotificationSettings {
    this.settings.notifications = { ...this.settings.notifications, ...settings };
    return this.settings.notifications;
  }

  toggleBattleInvites(): boolean {
    this.settings.notifications.battleInvites = !this.settings.notifications.battleInvites;
    return this.settings.notifications.battleInvites;
  }

  toggleMatchResults(): boolean {
    this.settings.notifications.matchResults = !this.settings.notifications.matchResults;
    return this.settings.notifications.matchResults;
  }

  togglePushNotifications(): boolean {
    this.settings.notifications.pushEnabled = !this.settings.notifications.pushEnabled;
    return this.settings.notifications.pushEnabled;
  }

  // Gameplay Settings
  updateGameplaySettings(settings: Partial<GameplaySettings>): GameplaySettings {
    this.settings.gameplay = { ...this.settings.gameplay, ...settings };
    return this.settings.gameplay;
  }

  toggleAutoConfirm(): boolean {
    this.settings.gameplay.autoConfirm = !this.settings.gameplay.autoConfirm;
    return this.settings.gameplay.autoConfirm;
  }

  toggleDamageNumbers(): boolean {
    this.settings.gameplay.showDamageNumbers = !this.settings.gameplay.showDamageNumbers;
    return this.settings.gameplay.showDamageNumbers;
  }

  toggleComboCounter(): boolean {
    this.settings.gameplay.showComboCounter = !this.settings.gameplay.showComboCounter;
    return this.settings.gameplay.showComboCounter;
  }

  // Reset
  resetToDefaults(): SettingsViewModel {
    this.settings = { ...DEFAULT_SETTINGS };
    return this.settings;
  }

  resetSoundSettings(): SoundSettings {
    this.settings.sound = { ...DEFAULT_SETTINGS.sound };
    return this.settings.sound;
  }

  resetDisplaySettings(): DisplaySettings {
    this.settings.display = { ...DEFAULT_SETTINGS.display };
    return this.settings.display;
  }

  // Metadata
  generateMetadata(): Metadata {
    return {
      title: 'Settings | Infinite Battle',
      description: 'Customize your Infinite Battle experience with sound, display, and gameplay settings.',
      keywords: ['settings', 'preferences', 'customization', 'options'],
      openGraph: {
        title: 'Settings | Infinite Battle',
        description: 'Customize your game experience',
        type: 'website',
      },
    };
  }
}
