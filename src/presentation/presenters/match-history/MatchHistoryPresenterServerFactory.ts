import { MatchHistoryPresenter } from './MatchHistoryPresenter';

/**
 * Factory for creating MatchHistoryPresenter on server side
 */
export class MatchHistoryPresenterServerFactory {
  static create(profileId?: string): MatchHistoryPresenter {
    return new MatchHistoryPresenter(profileId);
  }
}

export function createServerMatchHistoryPresenter(profileId?: string): MatchHistoryPresenter {
  return MatchHistoryPresenterServerFactory.create(profileId);
}
