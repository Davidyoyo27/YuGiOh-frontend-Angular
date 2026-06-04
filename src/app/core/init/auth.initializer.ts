import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

export function authInitializer() {

    const authService = inject(AuthService);

    return firstValueFrom(
        authService.checkAuth()
    );
}