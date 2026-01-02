/**
 * Achievements Page
 * Next.js Server Component for /achievements route
 */

import AchievementView from '@/src/presentation/components/achievement/AchievementView';
import { createServerAchievementPresenter } from '@/src/presentation/presenters/achievement/AchievementPresenterServerFactory';
import { Metadata } from 'next';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerAchievementPresenter();
  return presenter.generateMetadata();
}

export default async function AchievementsPage() {
  try {
    const presenter = createServerAchievementPresenter();
    const initialViewModel = await presenter.getViewModel('default-user');

    return <AchievementView initialViewModel={initialViewModel} />;
  } catch (error) {
    console.error('Error loading achievements page:', error);

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
          <h1 style={{ marginTop: '16px', fontSize: '1.5rem' }}>Achievements Error</h1>
          <p style={{ marginTop: '8px', opacity: 0.7 }}>
            Failed to load achievements. Please try again later.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              marginTop: '16px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              color: 'white',
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
