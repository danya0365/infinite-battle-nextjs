/**
 * SettingsPresenterClientFactory
 * Factory for creating SettingsPresenter instances on the client side
 */

'use client';

import { SettingsPresenter } from './SettingsPresenter';

export class SettingsPresenterClientFactory {
  static create(): SettingsPresenter {
    return new SettingsPresenter();
  }
}

export function createClientSettingsPresenter(): SettingsPresenter {
  return SettingsPresenterClientFactory.create();
}
