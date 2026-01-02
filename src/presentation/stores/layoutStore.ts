/**
 * Layout Store
 * Manages layout switching between MainLayout and RetroLayout
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LayoutType = 'main' | 'retro';

interface LayoutState {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  toggleLayout: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layout: 'main',
      setLayout: (layout) => set({ layout }),
      toggleLayout: () =>
        set((state) => ({
          layout: state.layout === 'main' ? 'retro' : 'main',
        })),
    }),
    {
      name: 'infinite-battle-layout',
    }
  )
);
