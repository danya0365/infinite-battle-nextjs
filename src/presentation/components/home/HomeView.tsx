'use client';

import { HomeViewModel } from '@/src/presentation/presenters/home/HomePresenter';
import { useHomePresenter } from '@/src/presentation/presenters/home/useHomePresenter';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { MainHomeContent } from './main/MainHomeContent';
import { RetroHomeContent } from './retro/RetroHomeContent';

interface HomeViewProps {
  initialViewModel?: HomeViewModel;
}

/**
 * HomeView - Main view component for home page
 * Switches between Main and Retro content based on layout
 */
export function HomeView({ initialViewModel }: HomeViewProps) {
  const [state, actions] = useHomePresenter(initialViewModel);
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
    <RetroHomeContent viewModel={viewModel} />
  ) : (
    <MainHomeContent viewModel={viewModel} />
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
        <p className="text-white/70 text-lg">Loading...</p>
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
        <p style={{ fontSize: '11px' }}>Loading page...</p>
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
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-white/60 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="main-btn main-btn-primary"
        >
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
