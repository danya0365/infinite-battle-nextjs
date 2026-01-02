/**
 * LeaderboardPresenterServerFactory
 * Factory for creating LeaderboardPresenter on the server side
 */

import { MockLeaderboardRepository } from '@/src/infrastructure/repositories/mock/MockLeaderboardRepository';
import { LeaderboardPresenter } from './LeaderboardPresenter';

export class LeaderboardPresenterServerFactory {
  static create(): LeaderboardPresenter {
    // Use mock repository for development
    // TODO: Switch to Supabase repository for production
    const repository = new MockLeaderboardRepository();
    return new LeaderboardPresenter(repository);
  }
}

export function createServerLeaderboardPresenter(): LeaderboardPresenter {
  return LeaderboardPresenterServerFactory.create();
}
