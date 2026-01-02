import { ProfilePresenter } from './ProfilePresenter';

/**
 * Factory for creating ProfilePresenter on server side
 */
export class ProfilePresenterServerFactory {
  static create(userId?: string): ProfilePresenter {
    return new ProfilePresenter(userId);
  }
}

export function createServerProfilePresenter(userId?: string): ProfilePresenter {
  return ProfilePresenterServerFactory.create(userId);
}
