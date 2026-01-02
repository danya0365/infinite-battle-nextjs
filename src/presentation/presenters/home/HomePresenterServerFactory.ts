import { HomePresenter } from './HomePresenter';

/**
 * Factory for creating HomePresenter on server side
 */
export class HomePresenterServerFactory {
  static create(): HomePresenter {
    return new HomePresenter();
  }
}

export function createServerHomePresenter(): HomePresenter {
  return HomePresenterServerFactory.create();
}
