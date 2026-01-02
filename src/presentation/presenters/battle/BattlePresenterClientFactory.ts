/**
 * BattlePresenterClientFactory
 * Factory for creating BattlePresenter instances on the client side
 */

'use client';

import { BattlePresenter } from './BattlePresenter';

export function createClientBattlePresenter(battleId?: string): BattlePresenter {
  return new BattlePresenter(battleId);
}
