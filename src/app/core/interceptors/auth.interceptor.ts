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

    return next(req).pipe(

        catchError((error: HttpErrorResponse) => {

            const isAuthEndpoint = authUrls.some(url =>
                req.url.includes(url)
            );

            if (error.status === 401 && !isAuthEndpoint) {
                
                return authService.refresh().pipe(

                    switchMap(() => {
                        return next(req);
                    }),

                    catchError(() => {
                        authStore.clearAuth();
                        router.navigate(['/login']);
                        return throwError(() => error);
                    })
                );
            }

            return throwError(() => error);
        })

    );

};