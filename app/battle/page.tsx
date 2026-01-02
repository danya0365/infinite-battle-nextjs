/**
 * Battle Page
 * Next.js Server Component for /battle route
 */

import BattleView from '@/src/presentation/components/battle/BattleView';
import { createServerBattlePresenter } from '@/src/presentation/presenters/battle/BattlePresenterServerFactory';
import { Metadata } from 'next';

// Force dynamic rendering for fresh battle data
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerBattlePresenter();
  return presenter.generateMetadata();
}

export default async function BattlePage() {
  try {
    const presenter = createServerBattlePresenter();
    const initialViewModel = presenter.getViewModel();

    return <BattleView initialViewModel={initialViewModel} />;
  } catch (error) {
    console.error('Error loading battle page:', error);
    
    // Fallback error UI
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        padding: '32px',
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '32px',
          background: 'var(--main-glass-bg, rgba(255,255,255,0.1))',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          maxWidth: '400px',
        }}>
          <span style={{ fontSize: '48px' }}>⚠️</span>
          <h1 style={{ marginTop: '16px', fontSize: '1.5rem' }}>Battle Arena Error</h1>
          <p style={{ marginTop: '8px', opacity: 0.7 }}>
            Failed to load the battle arena. Please try again later.
          </p>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              marginTop: '16px',
              padding: '12px 24px',
              background: 'var(--main-primary, #3b82f6)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            ← Return Home
          </a>
        </div>
      </div>
    );
  }
}
