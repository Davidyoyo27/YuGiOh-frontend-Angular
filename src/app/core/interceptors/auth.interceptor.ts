import {
    HttpErrorResponse,
    HttpInterceptorFn
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';
import { AuthService } from '../../features/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const router = inject(Router);
    const authStore = inject(AuthStore);
    const authService = inject(AuthService);

    // exclusion de los endpoints de autenticacion
    const authUrls = [
        '/auth/login',
        '/auth/logout',
        '/auth/check-auth',
        '/auth/refresh',
    ];

    const isAuthEndpoint = authUrls.some(url => req.url.includes(url));

    return next(req).pipe(

        catchError((error: HttpErrorResponse) => {

            // Solo intentamos renovar ante un 401
            if (error.status !== 401 || isAuthEndpoint) {
                return throwError(() => error);
            }

            return authService.refresh().pipe(

                // 1. Si falla la renovación, la sesión ya no puede recuperarse
                catchError((refreshError: HttpErrorResponse) => {

                    if (refreshError.status === 401 || refreshError.status === 403) {
                        authStore.clearAuth();
                        router.navigate(['/login']);
                    }

                    return throwError(() => refreshError);
                }),

                // 2. Si la renovación funciona, reintentamos la petición original
                switchMap(() => {
                    return next(req).pipe(

                        // 3. Solo cerramos la sesión si el reintento vuelve a dar 401.
                        catchError((retryError: HttpErrorResponse) => {

                            if (retryError.status === 401) {
                                authStore.clearAuth();
                                router.navigate(['/login']);
                            }

                            return throwError(() => retryError);
                        })

                    );
                }),
            );

        })

    );

};