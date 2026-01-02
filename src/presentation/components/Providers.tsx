'use client';

import { LayoutProvider } from '@/src/presentation/components/layouts/LayoutProvider';
import { OfflineIndicator } from '@/src/presentation/components/pwa/OfflineIndicator';
import { PWAInstallButton } from '@/src/presentation/components/pwa/PWAInstallButton';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Providers - Wraps the app with all necessary providers
 * Includes PWA components for offline support and install prompt
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <LayoutProvider>
        {children}
        {/* PWA Components */}
        <OfflineIndicator />
        <PWAInstallButton variant="modal" />
      </LayoutProvider>
    </ThemeProvider>
  );
}
