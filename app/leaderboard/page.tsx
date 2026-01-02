/**
 * Leaderboard Page
 * Next.js Server Component for /leaderboard route
 */

import LeaderboardView from '@/src/presentation/components/leaderboard/LeaderboardView';
import { createServerLeaderboardPresenter } from '@/src/presentation/presenters/leaderboard/LeaderboardPresenterServerFactory';
import { Metadata } from 'next';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerLeaderboardPresenter();
  return presenter.generateMetadata();
}

export default async function LeaderboardPage() {
  try {
    const presenter = createServerLeaderboardPresenter();
    const initialViewModel = await presenter.getViewModel('ranked');

    return <LeaderboardView initialViewModel={initialViewModel} />;
  } catch (error) {
    console.error('Error loading leaderboard page:', error);

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '32px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '32px',
            background: 'var(--main-glass-bg, rgba(255,255,255,0.1))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            maxWidth: '400px',
          }}
        >
          <span style={{ fontSize: '48px' }}>🏆</span>
          <h1 style={{ marginTop: '16px', fontSize: '1.5rem' }}>Leaderboard Error</h1>
          <p style={{ marginTop: '8px', opacity: 0.7 }}>
            Failed to load the leaderboard. Please try again later.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              marginTop: '16px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #ffd700, #ff6b00)',
              color: '#000',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            ← Return Home
          </a>
        </div>
      </div>
    );
  }
}
