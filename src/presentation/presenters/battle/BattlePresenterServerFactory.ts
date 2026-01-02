/**
 * BattlePresenterServerFactory
 * Factory for creating BattlePresenter instances on the server side
 */

import { BattlePresenter } from './BattlePresenter';

export function createServerBattlePresenter(battleId?: string): BattlePresenter {
  return new BattlePresenter(battleId);
}
