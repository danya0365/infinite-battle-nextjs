/**
 * useBattlePresenter Hook
 * React hook for managing battle state and actions
 */

'use client';

import { useBattleStore } from '@/src/presentation/stores/battleStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BattleAction, BattlePresenter, BattleViewModel } from './BattlePresenter';
import { createClientBattlePresenter } from './BattlePresenterClientFactory';

interface UseBattlePresenterOptions {
  initialViewModel?: BattleViewModel;
  battleId?: string;
}

interface UseBattlePresenterReturn {
  viewModel: BattleViewModel;
  isLoading: boolean;
  error: string | null;
  
  // Card actions
  selectCard: (cardId: string) => void;
  deselectCard: (cardId: string) => void;
  playSelectedCards: () => void;
  
  // Battle actions
  useVanish: () => void;
  useRisingRush: () => void;
  switchCharacter: (characterId: string) => void;
  transform: () => void;
  
  // Battle flow
  startBattle: () => void;
  pauseBattle: () => void;
  resumeBattle: () => void;
  endBattle: () => void;
  
  // Battle modes
  battleModes: { id: string; name: string; description: string; icon: string }[];
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
  
  // Timer
  timer: number;
}

export function useBattlePresenter(options: UseBattlePresenterOptions = {}): UseBattlePresenterReturn {
  const { initialViewModel, battleId } = options;
  const presenterRef = useRef<BattlePresenter | null>(null);
  
  const [viewModel, setViewModel] = useState<BattleViewModel>(
    initialViewModel || {
      battle: null,
      state: 'waiting',
      phase: 'card_selection',
      currentTurn: 0,
      timer: 0,
      player: null,
      opponent: null,
      stage: undefined,
      battleLog: [],
      canSelectCards: false,
      selectedCards: [],
      isPlayerTurn: true,
      battleResult: 'ongoing',
    }
  );
  
  const [isLoading, setIsLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>('training');
  const [timer, setTimer] = useState(15);
  
  const battleStore = useBattleStore();

  // Initialize presenter
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        presenterRef.current = createClientBattlePresenter(battleId);
        const vm = presenterRef.current.getViewModel();
        setViewModel(vm);
        setTimer(vm.timer);
        
        if (vm.battle) {
          battleStore.setActiveBattle(vm.battle);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load battle');
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialViewModel) {
      loadData();
    } else {
      presenterRef.current = createClientBattlePresenter(battleId);
    }
  }, [battleId, initialViewModel]);

  // Timer countdown
  useEffect(() => {
    if (viewModel.state !== 'fighting' || viewModel.phase !== 'card_selection') {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          // Auto-play when timer runs out
          playSelectedCards();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [viewModel.state, viewModel.phase]);

  const selectCard = useCallback((cardId: string) => {
    if (selectedCards.length >= 4) return;
    if (selectedCards.includes(cardId)) return;
    
    setSelectedCards((prev) => [...prev, cardId]);
    presenterRef.current?.selectCard(cardId);
    battleStore.selectCard(cardId);
  }, [selectedCards, battleStore]);

  const deselectCard = useCallback((cardId: string) => {
    setSelectedCards((prev) => prev.filter((id) => id !== cardId));
    presenterRef.current?.deselectCard(cardId);
    battleStore.deselectCard(cardId);
  }, [battleStore]);

  const playSelectedCards = useCallback(() => {
    if (selectedCards.length === 0) return;
    
    // Simulate playing cards
    selectedCards.forEach((cardId) => {
      const action: BattleAction = { type: 'use_card', cardId };
      const logEntry = presenterRef.current?.executeAction(action);
      if (logEntry) {
        battleStore.addBattleLog(logEntry);
      }
    });
    
    setSelectedCards([]);
    presenterRef.current?.clearSelectedCards();
    battleStore.clearSelectedCards();
    setTimer(15);
    
    // Update view model
    if (presenterRef.current) {
      setViewModel(presenterRef.current.getViewModel());
    }
  }, [selectedCards, battleStore]);

  const useVanish = useCallback(() => {
    if (viewModel.player && viewModel.player.vanishGauge >= 20) {
      // Vanish uses 20% gauge
      console.log('Vanish used!');
    }
  }, [viewModel.player]);

  const useRisingRush = useCallback(() => {
    if (viewModel.player?.risingRushReady) {
      const action: BattleAction = { type: 'rising_rush' };
      presenterRef.current?.executeAction(action);
    }
  }, [viewModel.player]);

  const switchCharacter = useCallback((characterId: string) => {
    const action: BattleAction = { type: 'switch_character', targetCharacterId: characterId };
    presenterRef.current?.executeAction(action);
    
    if (presenterRef.current) {
      setViewModel(presenterRef.current.getViewModel());
    }
  }, []);

  const transform = useCallback(() => {
    const action: BattleAction = { type: 'transform' };
    presenterRef.current?.executeAction(action);
    
    if (presenterRef.current) {
      setViewModel(presenterRef.current.getViewModel());
    }
  }, []);

  const startBattle = useCallback(() => {
    battleStore.updateBattleState('fighting');
    setViewModel((prev) => ({ ...prev, state: 'fighting' }));
    setTimer(15);
  }, [battleStore]);

  const pauseBattle = useCallback(() => {
    battleStore.updateBattleState('paused');
    setViewModel((prev) => ({ ...prev, state: 'paused' }));
  }, [battleStore]);

  const resumeBattle = useCallback(() => {
    battleStore.updateBattleState('fighting');
    setViewModel((prev) => ({ ...prev, state: 'fighting' }));
  }, [battleStore]);

  const endBattle = useCallback(() => {
    battleStore.endBattle();
    setViewModel((prev) => ({ 
      ...prev, 
      state: 'finished',
      battleResult: prev.battleResult === 'ongoing' ? 'draw' : prev.battleResult 
    }));
  }, [battleStore]);

  const battleModes = BattlePresenter.getBattleModes();

  return {
    viewModel: {
      ...viewModel,
      selectedCards,
      timer,
    },
    isLoading,
    error,
    selectCard,
    deselectCard,
    playSelectedCards,
    useVanish,
    useRisingRush,
    switchCharacter,
    transform,
    startBattle,
    pauseBattle,
    resumeBattle,
    endBattle,
    battleModes,
    selectedMode,
    setSelectedMode,
    timer,
  };
}
