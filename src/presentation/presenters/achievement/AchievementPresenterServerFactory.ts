/**
 * AchievementPresenterServerFactory
 * Factory for creating AchievementPresenter on the server side
 */

import { MockAchievementRepository } from '@/src/infrastructure/repositories/mock/MockAchievementRepository';
import { AchievementPresenter } from './AchievementPresenter';

export class AchievementPresenterServerFactory {
  static create(): AchievementPresenter {
    const repository = new MockAchievementRepository();
    return new AchievementPresenter(repository);
  }
}

export function createServerAchievementPresenter(): AchievementPresenter {
  return AchievementPresenterServerFactory.create();
}
