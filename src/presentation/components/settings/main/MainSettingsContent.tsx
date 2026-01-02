/**
 * MainSettingsContent
 * Modern, premium settings UI with glassmorphism and animations
 * Features categorized settings with toggles and sliders
 */

'use client';

import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { MainModal } from '@/src/presentation/components/layouts/main/MainComponents/MainModal';
import { SettingsViewModel } from '@/src/presentation/presenters/settings/SettingsPresenter';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useState } from 'react';

interface MainSettingsContentProps {
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

type SettingsTab = 'sound' | 'display' | 'notifications' | 'gameplay';

export default function MainSettingsContent({
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
}: MainSettingsContentProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('display');
  const [showResetModal, setShowResetModal] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  const tabs: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'display', label: 'Display', icon: '🎨' },
    { id: 'sound', label: 'Sound', icon: '🔊' },
    { id: 'gameplay', label: 'Gameplay', icon: '🎮' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ];

  return (
    <animated.div style={fadeIn} className="main-content">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '24px',
        gap: '24px',
        overflow: 'auto',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              ⚙️ Settings
            </h1>
            <p style={{ color: 'var(--main-text-secondary)', marginTop: '4px' }}>
              Customize your game experience
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {hasChanges && (
              <MainButton variant="primary" onClick={saveSettings}>
                💾 Save Changes
              </MainButton>
            )}
            <Link href="/">
              <MainButton variant="ghost">← Back</MainButton>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'var(--main-glass-bg)',
          backdropFilter: 'blur(10px)',
          padding: '8px',
          borderRadius: '16px',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #a855f7, #3b82f6)' 
                  : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                color: activeTab === tab.id ? 'white' : 'var(--main-text)',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div style={{
          flex: 1,
          background: 'var(--main-glass-bg)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
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

        {/* Footer Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <MainButton variant="ghost" onClick={() => setShowResetModal(true)}>
            🔄 Reset All Settings
          </MainButton>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <MainModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="⚠️ Reset All Settings?"
      >
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--main-text-secondary)', marginBottom: '24px' }}>
            This will reset all settings to their default values. This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <MainButton variant="ghost" onClick={() => setShowResetModal(false)}>
              Cancel
            </MainButton>
            <MainButton
              variant="primary"
              onClick={() => {
                resetToDefaults();
                setShowResetModal(false);
              }}
              style={{ background: 'var(--main-error)' }}
            >
              Reset All
            </MainButton>
          </div>
        </div>
      </MainModal>
    </animated.div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SettingGroup title="Theme" description="Choose your preferred color scheme">
        <div style={{ display: 'flex', gap: '12px' }}>
          {(['light', 'dark', 'system'] as const).map((t) => (
            <ThemeButton
              key={t}
              theme={t}
              isActive={viewModel.display.theme === t}
              onClick={() => setTheme(t)}
            />
          ))}
        </div>
      </SettingGroup>

      <SettingGroup title="Layout Style" description="Switch between modern and retro UI">
        <div style={{ display: 'flex', gap: '12px' }}>
          <LayoutButton
            layout="main"
            label="Modern"
            icon="✨"
            isActive={viewModel.display.layout === 'main'}
            onClick={() => setLayout('main')}
          />
          <LayoutButton
            layout="retro"
            label="Retro (Win98)"
            icon="💾"
            isActive={viewModel.display.layout === 'retro'}
            onClick={() => setLayout('retro')}
          />
        </div>
      </SettingGroup>

      <SettingGroup title="Language" description="Select your preferred language">
        <div style={{ display: 'flex', gap: '12px' }}>
          <LanguageButton
            language="th"
            label="🇹🇭 ไทย"
            isActive={viewModel.display.language === 'th'}
            onClick={() => setLanguage('th')}
          />
          <LanguageButton
            language="en"
            label="🇺🇸 English"
            isActive={viewModel.display.language === 'en'}
            onClick={() => setLanguage('en')}
          />
        </div>
      </SettingGroup>

      <SettingToggle
        label="Show FPS Counter"
        description="Display frames per second in battle"
        isEnabled={viewModel.display.showFps}
        onToggle={toggleFps}
      />

      <SettingToggle
        label="Reduce Motion"
        description="Reduce animations for better performance"
        isEnabled={viewModel.display.reduceMotion}
        onToggle={toggleReduceMotion}
      />

      <button
        onClick={resetSection}
        style={{
          alignSelf: 'flex-start',
          padding: '8px 16px',
          background: 'transparent',
          border: '1px solid var(--main-border)',
          borderRadius: '8px',
          color: 'var(--main-text-secondary)',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Reset Display Settings
      </button>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SettingToggle
        label="Sound Effects"
        description="Enable game sound effects"
        isEnabled={viewModel.sound.soundEnabled}
        onToggle={toggleSound}
      />

      <SettingToggle
        label="Background Music"
        description="Enable background music"
        isEnabled={viewModel.sound.musicEnabled}
        onToggle={toggleMusic}
      />

      <VolumeSlider
        label="Master Volume"
        value={viewModel.sound.masterVolume}
        onChange={setMasterVolume}
        icon="🔊"
      />

      <VolumeSlider
        label="SFX Volume"
        value={viewModel.sound.sfxVolume}
        onChange={setSfxVolume}
        icon="💥"
        disabled={!viewModel.sound.soundEnabled}
      />

      <VolumeSlider
        label="Music Volume"
        value={viewModel.sound.musicVolume}
        onChange={setMusicVolume}
        icon="🎵"
        disabled={!viewModel.sound.musicEnabled}
      />

      <button
        onClick={resetSection}
        style={{
          alignSelf: 'flex-start',
          padding: '8px 16px',
          background: 'transparent',
          border: '1px solid var(--main-border)',
          borderRadius: '8px',
          color: 'var(--main-text-secondary)',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Reset Sound Settings
      </button>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SettingToggle
        label="Show Damage Numbers"
        description="Display damage numbers during battle"
        isEnabled={viewModel.gameplay.showDamageNumbers}
        onToggle={toggleDamageNumbers}
      />

      <SettingToggle
        label="Show Combo Counter"
        description="Display combo counter during battle"
        isEnabled={viewModel.gameplay.showComboCounter}
        onToggle={toggleComboCounter}
      />

      <SettingToggle
        label="Auto-Confirm Actions"
        description="Automatically confirm battle actions"
        isEnabled={viewModel.gameplay.autoConfirm}
        onToggle={toggleAutoConfirm}
      />

      <SettingToggle
        label="Tutorial Hints"
        description="Show helpful tips during gameplay"
        isEnabled={viewModel.gameplay.tutorialHints}
        onToggle={toggleTutorialHints}
      />

      <SettingToggle
        label="Confirm on Quit"
        description="Ask for confirmation before quitting battles"
        isEnabled={viewModel.gameplay.confirmQuit}
        onToggle={toggleConfirmQuit}
      />

      <button
        onClick={resetSection}
        style={{
          alignSelf: 'flex-start',
          padding: '8px 16px',
          background: 'transparent',
          border: '1px solid var(--main-border)',
          borderRadius: '8px',
          color: 'var(--main-text-secondary)',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Reset Gameplay Settings
      </button>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SettingToggle
        label="Push Notifications"
        description="Enable push notifications on this device"
        isEnabled={viewModel.notifications.pushEnabled}
        onToggle={togglePushNotifications}
      />

      <SettingToggle
        label="Battle Invites"
        description="Notify when you receive battle invitations"
        isEnabled={viewModel.notifications.battleInvites}
        onToggle={toggleBattleInvites}
        disabled={!viewModel.notifications.pushEnabled}
      />

      <SettingToggle
        label="Match Results"
        description="Notify when matches are completed"
        isEnabled={viewModel.notifications.matchResults}
        onToggle={toggleMatchResults}
        disabled={!viewModel.notifications.pushEnabled}
      />

      <SettingToggle
        label="Events"
        description="Notify about new events and tournaments"
        isEnabled={viewModel.notifications.events}
        onToggle={toggleEvents}
        disabled={!viewModel.notifications.pushEnabled}
      />

      <SettingToggle
        label="News & Updates"
        description="Notify about game news and updates"
        isEnabled={viewModel.notifications.news}
        onToggle={toggleNews}
        disabled={!viewModel.notifications.pushEnabled}
      />

      <button
        onClick={resetSection}
        style={{
          alignSelf: 'flex-start',
          padding: '8px 16px',
          background: 'transparent',
          border: '1px solid var(--main-border)',
          borderRadius: '8px',
          color: 'var(--main-text-secondary)',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Reset Notification Settings
      </button>
    </div>
  );
}

// Setting Group Component
function SettingGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{title}</h3>
      <p style={{ color: 'var(--main-text-secondary)', fontSize: '0.875rem', marginBottom: '12px' }}>
        {description}
      </p>
      {children}
    </div>
  );
}

// Setting Toggle Component
function SettingToggle({
  label,
  description,
  isEnabled,
  onToggle,
  disabled,
}: {
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        background: 'var(--main-glass-bg)',
        borderRadius: '12px',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div>
        <h4 style={{ fontWeight: '500' }}>{label}</h4>
        <p style={{ color: 'var(--main-text-secondary)', fontSize: '0.875rem' }}>{description}</p>
      </div>
      <button
        onClick={onToggle}
        disabled={disabled}
        style={{
          width: '52px',
          height: '28px',
          borderRadius: '14px',
          border: 'none',
          background: isEnabled
            ? 'linear-gradient(135deg, #a855f7, #3b82f6)'
            : 'var(--color-border)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          position: 'relative',
          transition: 'background 0.2s ease',
        }}
      >
        <div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'white',
            position: 'absolute',
            top: '3px',
            left: isEnabled ? '27px' : '3px',
            transition: 'left 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  );
}

// Volume Slider Component
function VolumeSlider({
  label,
  value,
  onChange,
  icon,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: string;
  disabled?: boolean;
}) {
  return (
    <div style={{ opacity: disabled ? 0.5 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>
          {icon} {label}
        </span>
        <span style={{ color: 'var(--main-primary)', fontWeight: 'bold' }}>{value}%</span>
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
          height: '8px',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          accentColor: 'var(--main-primary)',
        }}
      />
    </div>
  );
}

// Theme Button Component
function ThemeButton({
  theme,
  isActive,
  onClick,
}: {
  theme: 'light' | 'dark' | 'system';
  isActive: boolean;
  onClick: () => void;
}) {
  const icons = { light: '☀️', dark: '🌙', system: '💻' };
  const labels = { light: 'Light', dark: 'Dark', system: 'System' };

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '16px',
        background: isActive ? 'linear-gradient(135deg, #a855f7, #3b82f6)' : 'var(--main-glass-bg)',
        border: isActive ? 'none' : '1px solid var(--main-border)',
        borderRadius: '12px',
        cursor: 'pointer',
        color: isActive ? 'white' : 'var(--main-text)',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{icons[theme]}</div>
      <div style={{ fontWeight: isActive ? 'bold' : 'normal' }}>{labels[theme]}</div>
    </button>
  );
}

// Layout Button Component
function LayoutButton({
  layout,
  label,
  icon,
  isActive,
  onClick,
}: {
  layout: 'main' | 'retro';
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '16px',
        background: isActive ? 'linear-gradient(135deg, #a855f7, #3b82f6)' : 'var(--main-glass-bg)',
        border: isActive ? 'none' : '1px solid var(--main-border)',
        borderRadius: '12px',
        cursor: 'pointer',
        color: isActive ? 'white' : 'var(--main-text)',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontWeight: isActive ? 'bold' : 'normal' }}>{label}</div>
    </button>
  );
}

// Language Button Component
function LanguageButton({
  language,
  label,
  isActive,
  onClick,
}: {
  language: 'th' | 'en';
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '12px 24px',
        background: isActive ? 'linear-gradient(135deg, #a855f7, #3b82f6)' : 'var(--main-glass-bg)',
        border: isActive ? 'none' : '1px solid var(--main-border)',
        borderRadius: '12px',
        cursor: 'pointer',
        color: isActive ? 'white' : 'var(--main-text)',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  );
}
