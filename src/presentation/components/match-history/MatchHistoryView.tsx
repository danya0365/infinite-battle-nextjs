'use client';

import { MatchHistoryViewModel } from '@/src/presentation/presenters/match-history/MatchHistoryPresenter';
import { useMatchHistoryPresenter } from '@/src/presentation/presenters/match-history/useMatchHistoryPresenter';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { MainMatchHistoryContent } from './main/MainMatchHistoryContent';
import { RetroMatchHistoryContent } from './retro/RetroMatchHistoryContent';

interface MatchHistoryViewProps {
  initialViewModel?: MatchHistoryViewModel;
}

/**
 * MatchHistoryView - Main view component for match history page
 * Switches between Main and Retro content based on layout
 */
export function MatchHistoryView({ initialViewModel }: MatchHistoryViewProps) {
  const [state, actions] = useMatchHistoryPresenter(initialViewModel);
  const { layout } = useLayoutStore();
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    return layout === 'retro' ? (
      <RetroLoadingState />
    ) : (
      <MainLoadingState />
    );
  }

  // Error state
  if (state.error && !viewModel) {
    return layout === 'retro' ? (
      <RetroErrorState error={state.error} onRetry={actions.loadData} />
    ) : (
      <MainErrorState error={state.error} onRetry={actions.loadData} />
    );
  }

  // No data state
  if (!viewModel) {
    return null;
  }

  // Render based on layout
  return layout === 'retro' ? (
    <RetroMatchHistoryContent viewModel={viewModel} actions={actions} />
  ) : (
    <MainMatchHistoryContent viewModel={viewModel} actions={actions} />
  );
}

// Loading States
function MainLoadingState() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-white/70 text-lg">Loading match history...</p>
      </div>
    </div>
  );
}

function RetroLoadingState() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="retro-progress" style={{ width: '200px' }}>
            <div className="retro-progress-bar" style={{ width: '60%' }} />
          </div>
        </div>
        <p style={{ fontSize: '11px' }}>Loading match history...</p>
      </div>
    </div>
  );
}

// Error States
function MainErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center main-card p-8">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">Failed to load history</h2>
        <p className="text-white/60 mb-6">{error}</p>
        <button onClick={onRetry} className="main-btn main-btn-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}

function RetroErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="retro-card" style={{ maxWidth: '400px' }}>
        <div className="flex items-start gap-4 mb-4">
          <span className="text-4xl">❌</span>
          <div>
            <h2 className="retro-card-title">Error</h2>
            <p style={{ fontSize: '11px' }}>{error}</p>
          </div>
        </div>
        <div className="text-right">
          <button onClick={onRetry} className="retro-btn">
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
