/**
 * Auth Store
 * Manages authentication state (using mock data for now)
 */

import { CURRENT_MOCK_PROFILE, MockProfile } from '@/src/data/mock/profiles';
import { CURRENT_MOCK_USER, MockUser } from '@/src/data/mock/users';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: MockUser | null;
  profile: MockProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: MockUser | null) => void;
  setProfile: (profile: MockProfile | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchProfile: (profileId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: CURRENT_MOCK_USER, // Auto-login with mock user for development
      profile: CURRENT_MOCK_PROFILE,
      isAuthenticated: true,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setProfile: (profile) => set({ profile }),

      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        if (email === CURRENT_MOCK_USER.email) {
          set({
            user: CURRENT_MOCK_USER,
            profile: CURRENT_MOCK_PROFILE,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
        });
      },

      switchProfile: (profileId: string) => {
        // In real app, fetch from API
        const profiles = [CURRENT_MOCK_PROFILE];
        const newProfile = profiles.find((p) => p.id === profileId);
        if (newProfile) {
          set({ profile: newProfile });
        }
      },
    }),
    {
      name: 'infinite-battle-auth',
    }
  )
);
