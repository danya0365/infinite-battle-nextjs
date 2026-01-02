/**
 * BattleView
 * Main view component for the battle page
 * Switches between MainBattleContent and RetroBattleContent based on layout
 */

'use client';

import { BattleViewModel } from '@/src/presentation/presenters/battle/BattlePresenter';
import { useBattlePresenter } from '@/src/presentation/presenters/battle/useBattlePresenter';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import MainBattleContent from './main/MainBattleContent';
import RetroBattleContent from './retro/RetroBattleContent';

interface BattleViewProps {
  initialViewModel?: BattleViewModel;
}

export default function BattleView({ initialViewModel }: BattleViewProps) {
  const { layout } = useLayoutStore();
  const battlePresenter = useBattlePresenter({ initialViewModel });

  if (battlePresenter.isLoading) {
    if (layout === 'retro') {
      return (
        <div className="retro-content-inner" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: '"MS Sans Serif", Tahoma, sans-serif', fontSize: '14px' }}>
            <p>⏳ Loading battle arena...</p>
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
          <p style={{ marginTop: '16px', color: 'var(--main-text-secondary)' }}>Preparing battle arena...</p>
        </div>
      </div>
    );
  }

  if (battlePresenter.error) {
    if (layout === 'retro') {
      return (
        <div className="retro-content-inner" style={{ padding: '16px' }}>
          <div className="retro-groupbox" style={{ borderColor: '#c00' }}>
            <div className="retro-groupbox-title" style={{ background: '#c00', color: 'white' }}>
              ⚠️ Error
            </div>
            <div className="retro-groupbox-content">
              <p>{battlePresenter.error}</p>
              <button 
                className="retro-button" 
                onClick={() => window.location.reload()}
                style={{ marginTop: '8px' }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div className="main-card main-glass" style={{ padding: '32px', textAlign: 'center', maxWidth: '400px' }}>
          <span style={{ fontSize: '48px' }}>⚠️</span>
          <h2 style={{ marginTop: '16px', color: 'var(--main-error)' }}>Battle Error</h2>
          <p style={{ color: 'var(--main-text-secondary)', marginTop: '8px' }}>{battlePresenter.error}</p>
          <button 
            className="main-button main-button-primary" 
            onClick={() => window.location.reload()}
            style={{ marginTop: '16px' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (layout === 'retro') {
    return <RetroBattleContent {...battlePresenter} />;
  }

  return <MainBattleContent {...battlePresenter} />;
}
