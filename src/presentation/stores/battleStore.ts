/**
 * Battle Store
 * Manages active battle state
 */

import { BattleLogEntry, BattlePhase, BattleState, MockBattle } from '@/src/data/mock/battles';
import { create } from 'zustand';

interface BattleStoreState {
  activeBattle: MockBattle | null;
  isInBattle: boolean;
  selectedCards: string[];
  
  // Actions
  setActiveBattle: (battle: MockBattle | null) => void;
  updateBattleState: (state: BattleState) => void;
  updateBattlePhase: (phase: BattlePhase) => void;
  selectCard: (cardId: string) => void;
  deselectCard: (cardId: string) => void;
  clearSelectedCards: () => void;
  addBattleLog: (entry: BattleLogEntry) => void;
  endBattle: () => void;
}

export const useBattleStore = create<BattleStoreState>()((set) => ({
  activeBattle: null,
  isInBattle: false,
  selectedCards: [],

  setActiveBattle: (battle) => set({ activeBattle: battle, isInBattle: !!battle }),

  updateBattleState: (state) =>
    set((current) => ({
      activeBattle: current.activeBattle
        ? { ...current.activeBattle, state }
        : null,
    })),

  updateBattlePhase: (phase) =>
    set((current) => ({
      activeBattle: current.activeBattle
        ? { ...current.activeBattle, phase }
        : null,
    })),

  selectCard: (cardId) =>
    set((current) => ({
      selectedCards: [...current.selectedCards, cardId],
    })),

  deselectCard: (cardId) =>
    set((current) => ({
      selectedCards: current.selectedCards.filter((id) => id !== cardId),
    })),

  clearSelectedCards: () => set({ selectedCards: [] }),

  addBattleLog: (entry) =>
    set((current) => ({
      activeBattle: current.activeBattle
        ? {
            ...current.activeBattle,
            battleLog: [...current.activeBattle.battleLog, entry],
          }
        : null,
    })),

  endBattle: () => set({ activeBattle: null, isInBattle: false, selectedCards: [] }),
}));
