import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { appRoutes } from './lib.routes';

export const provideApp = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
  ]);

export const initializeApp = () => {};
