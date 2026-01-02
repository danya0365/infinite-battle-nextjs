'use client';

import { LayoutProvider } from '@/src/presentation/components/layouts/LayoutProvider';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Providers - Wraps the app with all necessary providers
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <LayoutProvider>{children}</LayoutProvider>
    </ThemeProvider>
  );
}
