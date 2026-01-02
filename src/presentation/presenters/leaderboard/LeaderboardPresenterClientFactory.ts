/**
 * LeaderboardPresenterClientFactory
 * Factory for creating LeaderboardPresenter on the client side
 */

'use client';

import { MockLeaderboardRepository } from '@/src/infrastructure/repositories/mock/MockLeaderboardRepository';
import { LeaderboardPresenter } from './LeaderboardPresenter';

export class LeaderboardPresenterClientFactory {
  static create(): LeaderboardPresenter {
    const repository = new MockLeaderboardRepository();
    return new LeaderboardPresenter(repository);
  }
}

export function createClientLeaderboardPresenter(): LeaderboardPresenter {
  return LeaderboardPresenterClientFactory.create();
}
