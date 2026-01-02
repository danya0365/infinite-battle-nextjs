/**
 * LeaderboardView
 * Main view component that switches between Main and Retro layouts
 */

'use client';

import { LeaderboardViewModel } from '@/src/presentation/presenters/leaderboard/LeaderboardPresenter';
import { useLeaderboardPresenter } from '@/src/presentation/presenters/leaderboard/useLeaderboardPresenter';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import MainLeaderboardContent from './main/MainLeaderboardContent';
import RetroLeaderboardContent from './retro/RetroLeaderboardContent';

interface LeaderboardViewProps {
  initialViewModel?: LeaderboardViewModel;
}

export default function LeaderboardView({ initialViewModel }: LeaderboardViewProps) {
  const { layout } = useLayoutStore();
  const leaderboardPresenter = useLeaderboardPresenter({ initialViewModel });

  if (leaderboardPresenter.isLoading) {
    if (layout === 'retro') {
      return (
        <div className="retro-content-inner" style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: '"MS Sans Serif", Tahoma, sans-serif', fontSize: '14px' }}>
            <p>⏳ Loading leaderboard...</p>
            <div style={{ margin: '16px 0' }}>
              <progress style={{ width: '200px' }} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="main-spinner" style={{ width: '48px', height: '48px', margin: '0 auto' }} />
          <p style={{ marginTop: '16px', color: 'var(--main-text-secondary)' }}>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (leaderboardPresenter.error) {
    if (layout === 'retro') {
      return (
        <div className="retro-content-inner" style={{ padding: '16px' }}>
          <div style={{ border: '2px solid #800', padding: '16px', background: '#ffe0e0' }}>
            <p style={{ color: '#800', fontWeight: 'bold' }}>⚠️ Error: {leaderboardPresenter.error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ textAlign: 'center', padding: '32px', background: 'var(--main-glass-bg)', borderRadius: '16px' }}>
          <span style={{ fontSize: '48px' }}>⚠️</span>
          <h2 style={{ marginTop: '16px', color: 'var(--main-error)' }}>Error</h2>
          <p style={{ color: 'var(--main-text-secondary)' }}>{leaderboardPresenter.error}</p>
        </div>
      </div>
    );
  }

  if (layout === 'retro') {
    return <RetroLeaderboardContent {...leaderboardPresenter} />;
  }

  return <MainLeaderboardContent {...leaderboardPresenter} />;
}
