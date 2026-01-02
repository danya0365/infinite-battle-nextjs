'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { MainLayout } from './main/MainLayout';
import { RetroLayout } from './retro/RetroLayout';

interface LayoutProviderProps {
  children: React.ReactNode;
}

/**
 * LayoutProvider - Switches between MainLayout and RetroLayout
 * based on user preference stored in layoutStore
 */
export function LayoutProvider({ children }: LayoutProviderProps) {
  const { layout } = useLayoutStore();

  if (layout === 'retro') {
    return <RetroLayout>{children}</RetroLayout>;
  }

  return <MainLayout>{children}</MainLayout>;
}
