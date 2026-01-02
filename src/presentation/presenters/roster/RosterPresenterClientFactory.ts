'use client';

import { RosterPresenter } from './RosterPresenter';

/**
 * Factory for creating RosterPresenter on client side
 */
export class RosterPresenterClientFactory {
  static create(): RosterPresenter {
    return new RosterPresenter();
  }
}

export function createClientRosterPresenter(): RosterPresenter {
  return RosterPresenterClientFactory.create();
}
