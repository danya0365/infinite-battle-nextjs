/**
 * IBattleRepository
 * Repository interface for Battle data access
 * Following Clean Architecture - this is in the Application layer
 */

import { BattleLogEntry, BattlePhase, BattleState, MockBattle } from '@/src/data/mock/battles';

export interface BattleStats {
  totalBattles: number;
  activeBattles: number;
  finishedBattles: number;
  averageTurns: number;
}

export interface BattleFilters {
  profileId?: string;
  state?: BattleState;
  stageId?: string;
}

export interface CreateBattleData {
  matchId: string;
  profileId: string;
  characterIds: string[];
  opponentName?: string;
  opponentCharacterIds?: string[];
  stageId: string;
}

export interface IBattleRepository {
  /**
   * Get battle by ID
   */
  getById(id: string): Promise<MockBattle | null>;

  /**
   * Get all battles
   */
  getAll(): Promise<MockBattle[]>;

  /**
   * Get battles by profile ID
   */
  getByProfileId(profileId: string): Promise<MockBattle[]>;

  /**
   * Get active battle for a profile (if any)
   */
  getActiveBattleByProfileId(profileId: string): Promise<MockBattle | null>;

  /**
   * Create a new battle
   */
  create(data: CreateBattleData): Promise<MockBattle>;

  /**
   * Update battle state
   */
  updateState(id: string, state: BattleState): Promise<MockBattle>;

  /**
   * Update battle phase
   */
  updatePhase(id: string, phase: BattlePhase): Promise<MockBattle>;

  /**
   * Add battle log entry
   */
  addLogEntry(id: string, entry: BattleLogEntry): Promise<MockBattle>;

  /**
   * Update character HP
   */
  updateCharacterHp(
    battleId: string,
    isPlayer: boolean,
    characterId: string,
    newHp: number
  ): Promise<MockBattle>;

  /**
   * End battle
   */
  endBattle(id: string): Promise<MockBattle>;

  /**
   * Get battle statistics
   */
  getStats(): Promise<BattleStats>;
}
