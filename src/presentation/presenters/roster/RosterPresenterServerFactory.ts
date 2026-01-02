import { RosterPresenter } from './RosterPresenter';

/**
 * Factory for creating RosterPresenter on server side
 */
export class RosterPresenterServerFactory {
  static create(): RosterPresenter {
    return new RosterPresenter();
  }
}

export function createServerRosterPresenter(): RosterPresenter {
  return RosterPresenterServerFactory.create();
}
