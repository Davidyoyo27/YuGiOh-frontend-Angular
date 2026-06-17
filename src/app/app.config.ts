import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInitializer } from './core/init/auth.initializer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    
    provideAppInitializer(authInitializer),

    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: true,
    }),
  ]
};
