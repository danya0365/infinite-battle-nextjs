'use client';

import { ProfilePresenter } from './ProfilePresenter';

/**
 * Factory for creating ProfilePresenter on client side
 */
export class ProfilePresenterClientFactory {
  static create(userId?: string): ProfilePresenter {
    return new ProfilePresenter(userId);
  }
}

export function createClientProfilePresenter(userId?: string): ProfilePresenter {
  return ProfilePresenterClientFactory.create(userId);
}
