import { inject } from '@angular/core';
import { finalize, firstValueFrom } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { AuthStore } from '../../features/auth/store/auth.store';

export function authInitializer() {

    const authService = inject(AuthService);
    const authStore = inject(AuthStore);

    return firstValueFrom(
        authService.checkAuth().pipe(
            finalize(() => authStore.setInitialized(true))
        )
    );
}