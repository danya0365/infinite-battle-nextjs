'use client';

import { HomePresenter } from './HomePresenter';

/**
 * Factory for creating HomePresenter on client side
 */
export class HomePresenterClientFactory {
  static create(): HomePresenter {
    return new HomePresenter();
  }
}

export function createClientHomePresenter(): HomePresenter {
  return HomePresenterClientFactory.create();
}
