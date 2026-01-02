/**
 * Settings Page
 * Next.js Server Component for /settings route
 */

import SettingsView from '@/src/presentation/components/settings/SettingsView';
import { createServerSettingsPresenter } from '@/src/presentation/presenters/settings/SettingsPresenterServerFactory';
import { Metadata } from 'next';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerSettingsPresenter();
  return presenter.generateMetadata();
}

export default async function SettingsPage() {
  try {
    const presenter = createServerSettingsPresenter();
    const initialViewModel = presenter.getViewModel();

    return <SettingsView initialViewModel={initialViewModel} />;
  } catch (error) {
    console.error('Error loading settings page:', error);

    // Fallback error UI
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
          <span style={{ fontSize: '48px' }}>⚠️</span>
          <h1 style={{ marginTop: '16px', fontSize: '1.5rem' }}>Settings Error</h1>
          <p style={{ marginTop: '8px', opacity: 0.7 }}>
            Failed to load settings. Please try again later.
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
