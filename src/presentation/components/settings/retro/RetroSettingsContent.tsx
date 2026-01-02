/**
 * RetroSettingsContent
 * Windows 98 / Internet Explorer 5 style settings UI
 * Features classic dialog boxes, checkboxes, and controls
 */

'use client';

import { RetroButton } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroButton';
import { RetroGroupBox } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroForm';
import { RetroModal } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroModal';
import { SettingsViewModel } from '@/src/presentation/presenters/settings/SettingsPresenter';
import Link from 'next/link';
import { useState } from 'react';

interface RetroSettingsContentProps {
  viewModel: SettingsViewModel;
  hasChanges: boolean;
  setMasterVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLayout: (layout: 'main' | 'retro') => void;
  setLanguage: (language: 'th' | 'en') => void;
  toggleFps: () => void;
  toggleReduceMotion: () => void;
  toggleBattleInvites: () => void;
  toggleMatchResults: () => void;
  toggleEvents: () => void;
  toggleNews: () => void;
  togglePushNotifications: () => void;
  toggleAutoConfirm: () => void;
  toggleDamageNumbers: () => void;
  toggleComboCounter: () => void;
  toggleTutorialHints: () => void;
  toggleConfirmQuit: () => void;
  saveSettings: () => void;
  resetToDefaults: () => void;
  resetSection: (section: 'sound' | 'display' | 'notifications' | 'gameplay') => void;
}

type SettingsTab = 'display' | 'sound' | 'gameplay' | 'notifications';

export default function RetroSettingsContent({
  viewModel,
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
}: RetroSettingsContentProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('display');
  const [showResetModal, setShowResetModal] = useState(false);

  const tabs: { id: SettingsTab; label: string }[] = [
    { id: 'display', label: 'Display' },
    { id: 'sound', label: 'Sound' },
    { id: 'gameplay', label: 'Gameplay' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <div className="retro-content-inner" style={{ 
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: '8px',
    }}>
      {/* Title Bar Style Header */}
      <div style={{
        background: 'var(--retro-title-bar)',
        color: 'white',
        padding: '4px 8px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>⚙️ Infinite Battle - Settings</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {hasChanges && (
            <RetroButton onClick={saveSettings}>
              💾 Save
            </RetroButton>
          )}
          <Link href="/">
            <RetroButton>← Back</RetroButton>
          </Link>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #888',
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '6px 16px',
              background: activeTab === tab.id ? '#d4d0c8' : '#c0c0c0',
              border: '2px outset #d4d0c8',
              borderBottom: activeTab === tab.id ? 'none' : '2px outset #d4d0c8',
              cursor: 'pointer',
              marginBottom: activeTab === tab.id ? '-1px' : '0',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
              fontSize: '11px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div style={{
        flex: 1,
        padding: '8px',
        background: '#d4d0c8',
        border: '2px inset #808080',
        overflowY: 'auto',
      }}>
        {activeTab === 'display' && (
          <DisplaySettings
            viewModel={viewModel}
            setTheme={setTheme}
            setLayout={setLayout}
            setLanguage={setLanguage}
            toggleFps={toggleFps}
            toggleReduceMotion={toggleReduceMotion}
            resetSection={() => resetSection('display')}
          />
        )}

        {activeTab === 'sound' && (
          <SoundSettings
            viewModel={viewModel}
            setMasterVolume={setMasterVolume}
            setSfxVolume={setSfxVolume}
            setMusicVolume={setMusicVolume}
            toggleSound={toggleSound}
            toggleMusic={toggleMusic}
            resetSection={() => resetSection('sound')}
          />
        )}

        {activeTab === 'gameplay' && (
          <GameplaySettings
            viewModel={viewModel}
            toggleAutoConfirm={toggleAutoConfirm}
            toggleDamageNumbers={toggleDamageNumbers}
            toggleComboCounter={toggleComboCounter}
            toggleTutorialHints={toggleTutorialHints}
            toggleConfirmQuit={toggleConfirmQuit}
            resetSection={() => resetSection('gameplay')}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationSettings
            viewModel={viewModel}
            toggleBattleInvites={toggleBattleInvites}
            toggleMatchResults={toggleMatchResults}
            toggleEvents={toggleEvents}
            toggleNews={toggleNews}
            togglePushNotifications={togglePushNotifications}
            resetSection={() => resetSection('notifications')}
          />
        )}
      </div>

      {/* Footer Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px',
      }}>
        <RetroButton onClick={() => setShowResetModal(true)}>
          Restore Defaults
        </RetroButton>
        <div style={{ display: 'flex', gap: '4px' }}>
          <RetroButton onClick={saveSettings} disabled={!hasChanges}>
            Apply
          </RetroButton>
          <Link href="/">
            <RetroButton>Close</RetroButton>
          </Link>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <RetroModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="⚠️ Confirm Reset"
      >
        <div style={{ padding: '16px' }}>
          <p style={{ marginBottom: '16px' }}>
            Are you sure you want to reset all settings to their default values?
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <RetroButton onClick={() => setShowResetModal(false)}>
              Cancel
            </RetroButton>
            <RetroButton
              onClick={() => {
                resetToDefaults();
                setShowResetModal(false);
              }}
            >
              Yes, Reset All
            </RetroButton>
          </div>
        </div>
      </RetroModal>
    </div>
  );
}

// Display Settings Section
function DisplaySettings({
  viewModel,
  setTheme,
  setLayout,
  setLanguage,
  toggleFps,
  toggleReduceMotion,
  resetSection,
}: {
  viewModel: SettingsViewModel;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLayout: (layout: 'main' | 'retro') => void;
  setLanguage: (language: 'th' | 'en') => void;
  toggleFps: () => void;
  toggleReduceMotion: () => void;
  resetSection: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <RetroGroupBox label="Color Scheme">
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="theme"
              checked={viewModel.display.theme === 'light'}
              onChange={() => setTheme('light')}
            />
            ☀️ Light Mode
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="theme"
              checked={viewModel.display.theme === 'dark'}
              onChange={() => setTheme('dark')}
            />
            🌙 Dark Mode
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="theme"
              checked={viewModel.display.theme === 'system'}
              onChange={() => setTheme('system')}
            />
            💻 System Default
          </label>
        </div>
      </RetroGroupBox>

      <RetroGroupBox label="Layout Style">
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="layout"
              checked={viewModel.display.layout === 'main'}
              onChange={() => setLayout('main')}
            />
            ✨ Modern (Glassmorphism)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="layout"
              checked={viewModel.display.layout === 'retro'}
              onChange={() => setLayout('retro')}
            />
            💾 Retro (Windows 98)
          </label>
        </div>
      </RetroGroupBox>

      <RetroGroupBox label="Language">
        <div style={{ padding: '8px', display: 'flex', gap: '8px' }}>
          <select
            value={viewModel.display.language}
            onChange={(e) => setLanguage(e.target.value as 'th' | 'en')}
            style={{
              padding: '4px 8px',
              border: '2px inset #808080',
              background: 'white',
              fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
              fontSize: '11px',
            }}
          >
            <option value="th">🇹🇭 Thai (ไทย)</option>
            <option value="en">🇺🇸 English</option>
          </select>
        </div>
      </RetroGroupBox>

      <RetroGroupBox label="Performance Options">
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.display.showFps}
              onChange={toggleFps}
            />
            Show FPS Counter
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.display.reduceMotion}
              onChange={toggleReduceMotion}
            />
            Reduce Animations
          </label>
        </div>
      </RetroGroupBox>

      <RetroButton onClick={resetSection}>Reset Display Settings</RetroButton>
    </div>
  );
}

// Sound Settings Section
function SoundSettings({
  viewModel,
  setMasterVolume,
  setSfxVolume,
  setMusicVolume,
  toggleSound,
  toggleMusic,
  resetSection,
}: {
  viewModel: SettingsViewModel;
  setMasterVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  resetSection: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <RetroGroupBox label="Audio Options">
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.sound.soundEnabled}
              onChange={toggleSound}
            />
            Enable Sound Effects
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.sound.musicEnabled}
              onChange={toggleMusic}
            />
            Enable Background Music
          </label>
        </div>
      </RetroGroupBox>

      <RetroGroupBox label="Volume Controls">
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RetroSlider
            label="Master Volume"
            value={viewModel.sound.masterVolume}
            onChange={setMasterVolume}
          />
          <RetroSlider
            label="Sound Effects"
            value={viewModel.sound.sfxVolume}
            onChange={setSfxVolume}
            disabled={!viewModel.sound.soundEnabled}
          />
          <RetroSlider
            label="Music"
            value={viewModel.sound.musicVolume}
            onChange={setMusicVolume}
            disabled={!viewModel.sound.musicEnabled}
          />
        </div>
      </RetroGroupBox>

      <RetroButton onClick={resetSection}>Reset Sound Settings</RetroButton>
    </div>
  );
}

// Gameplay Settings Section
function GameplaySettings({
  viewModel,
  toggleAutoConfirm,
  toggleDamageNumbers,
  toggleComboCounter,
  toggleTutorialHints,
  toggleConfirmQuit,
  resetSection,
}: {
  viewModel: SettingsViewModel;
  toggleAutoConfirm: () => void;
  toggleDamageNumbers: () => void;
  toggleComboCounter: () => void;
  toggleTutorialHints: () => void;
  toggleConfirmQuit: () => void;
  resetSection: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <RetroGroupBox label="Battle Display">
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.gameplay.showDamageNumbers}
              onChange={toggleDamageNumbers}
            />
            Show Damage Numbers
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.gameplay.showComboCounter}
              onChange={toggleComboCounter}
            />
            Show Combo Counter
          </label>
        </div>
      </RetroGroupBox>

      <RetroGroupBox label="Gameplay Options">
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.gameplay.autoConfirm}
              onChange={toggleAutoConfirm}
            />
            Auto-Confirm Actions
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.gameplay.tutorialHints}
              onChange={toggleTutorialHints}
            />
            Show Tutorial Hints
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.gameplay.confirmQuit}
              onChange={toggleConfirmQuit}
            />
            Confirm Before Quitting
          </label>
        </div>
      </RetroGroupBox>

      <RetroButton onClick={resetSection}>Reset Gameplay Settings</RetroButton>
    </div>
  );
}

// Notification Settings Section
function NotificationSettings({
  viewModel,
  toggleBattleInvites,
  toggleMatchResults,
  toggleEvents,
  toggleNews,
  togglePushNotifications,
  resetSection,
}: {
  viewModel: SettingsViewModel;
  toggleBattleInvites: () => void;
  toggleMatchResults: () => void;
  toggleEvents: () => void;
  toggleNews: () => void;
  togglePushNotifications: () => void;
  resetSection: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <RetroGroupBox label="Push Notifications">
        <div style={{ padding: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.notifications.pushEnabled}
              onChange={togglePushNotifications}
            />
            Enable Push Notifications
          </label>
        </div>
      </RetroGroupBox>

      <RetroGroupBox label="Notification Types">
        <div style={{ 
          padding: '8px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '4px',
          opacity: viewModel.notifications.pushEnabled ? 1 : 0.5,
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.notifications.battleInvites}
              onChange={toggleBattleInvites}
              disabled={!viewModel.notifications.pushEnabled}
            />
            Battle Invitations
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.notifications.matchResults}
              onChange={toggleMatchResults}
              disabled={!viewModel.notifications.pushEnabled}
            />
            Match Results
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.notifications.events}
              onChange={toggleEvents}
              disabled={!viewModel.notifications.pushEnabled}
            />
            Events & Tournaments
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={viewModel.notifications.news}
              onChange={toggleNews}
              disabled={!viewModel.notifications.pushEnabled}
            />
            News & Updates
          </label>
        </div>
      </RetroGroupBox>

      <RetroButton onClick={resetSection}>Reset Notification Settings</RetroButton>
    </div>
  );
}

// Retro Slider Component
function RetroSlider({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  return (
    <div style={{ opacity: disabled ? 0.5 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>{label}:</span>
        <span>{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
        style={{
          width: '100%',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      />
    </div>
  );
}
