/**
 * Profile Store
 * Manages profile-related state
 */

import { MockProfile, getMockProfilesByUserId } from '@/src/data/mock/profiles';
import { create } from 'zustand';

interface ProfileStoreState {
  profiles: MockProfile[];
  selectedProfile: MockProfile | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadProfiles: (userId: string) => Promise<void>;
  selectProfile: (profile: MockProfile) => void;
  clearProfiles: () => void;
  setError: (error: string | null) => void;
}

export const useProfileStore = create<ProfileStoreState>()((set) => ({
  profiles: [],
  selectedProfile: null,
  isLoading: false,
  error: null,

  loadProfiles: async (userId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      const profiles = getMockProfilesByUserId(userId);
      set({ profiles, isLoading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to load profiles',
        isLoading: false 
      });
    }
  },

  selectProfile: (profile) => set({ selectedProfile: profile }),

  clearProfiles: () => set({ profiles: [], selectedProfile: null }),

  setError: (error) => set({ error }),
}));
