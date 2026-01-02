/**
 * SettingsView
 * Main view component for the settings page
 * Switches between MainSettingsContent and RetroSettingsContent based on layout
 */

'use client';

import { SettingsViewModel } from '@/src/presentation/presenters/settings/SettingsPresenter';
import { useSettingsPresenter } from '@/src/presentation/presenters/settings/useSettingsPresenter';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import MainSettingsContent from './main/MainSettingsContent';
import RetroSettingsContent from './retro/RetroSettingsContent';

interface SettingsViewProps {
  initialViewModel?: SettingsViewModel;
}

export default function SettingsView({ initialViewModel }: SettingsViewProps) {
  const { layout } = useLayoutStore();
  const settingsPresenter = useSettingsPresenter({ initialViewModel });

  if (settingsPresenter.isLoading) {
    if (layout === 'retro') {
      return (
        <div className="retro-content-inner" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: '"MS Sans Serif", Tahoma, sans-serif', fontSize: '14px' }}>
            <p>⏳ Loading settings...</p>
            <div style={{ margin: '16px 0' }}>
              <progress style={{ width: '200px' }} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div className="main-loading">
          <div className="main-spinner" />
          <p style={{ marginTop: '16px', color: 'var(--main-text-secondary)' }}>Loading settings...</p>
        </div>
      </div>
    );
  }

  if (settingsPresenter.error) {
    if (layout === 'retro') {
      return (
        <div className="retro-content-inner" style={{ padding: '16px' }}>
          <div className="retro-groupbox" style={{ borderColor: '#c00' }}>
            <div className="retro-groupbox-title" style={{ background: '#c00', color: 'white' }}>
              ⚠️ Error
            </div>
            <div className="retro-groupbox-content">
              <p>{settingsPresenter.error}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div className="main-card main-glass" style={{ padding: '32px', textAlign: 'center', maxWidth: '400px' }}>
          <span style={{ fontSize: '48px' }}>⚠️</span>
          <h2 style={{ marginTop: '16px', color: 'var(--main-error)' }}>Settings Error</h2>
          <p style={{ color: 'var(--main-text-secondary)', marginTop: '8px' }}>{settingsPresenter.error}</p>
        </div>
      </div>
    );
  }

  if (layout === 'retro') {
    return <RetroSettingsContent {...settingsPresenter} />;
  }

  return <MainSettingsContent {...settingsPresenter} />;
}
