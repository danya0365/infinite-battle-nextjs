'use client';

import { MatchHistoryPresenter } from './MatchHistoryPresenter';

/**
 * Factory for creating MatchHistoryPresenter on client side
 */
export class MatchHistoryPresenterClientFactory {
  static create(profileId?: string): MatchHistoryPresenter {
    return new MatchHistoryPresenter(profileId);
  }
}

export function createClientMatchHistoryPresenter(profileId?: string): MatchHistoryPresenter {
  return MatchHistoryPresenterClientFactory.create(profileId);
}
