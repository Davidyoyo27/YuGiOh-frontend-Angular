import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { LoginResponse } from "../interfaces/auth-login.interface";
import { AuthStore } from "../store/auth.store";
import { catchError, finalize, map, of, tap } from "rxjs";
import { Router } from '@angular/router';
import { CheckAuthResponse } from "../interfaces/check-auth-response.interface";
import { CreateUserResponse } from "../interfaces/auth-create-user.interface";
import { UserAccountActivationResponse } from "../interfaces/auth-user-account-activation.interface";
import { StandardResponse } from "../interfaces/standard-response.interface";
import { ResetPasswordResponse } from "../interfaces/auth-reset-password.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
    // injects
    router = inject(Router);

    // privates
    private http = inject(HttpClient);
    private authStore = inject(AuthStore);

    login(email: string, password: string) {
        return this.http.post<LoginResponse>(`${environment.baseURL}/auth/login`,
            { email, password },
            { withCredentials: true }
        )
        .pipe(
            tap((resp) => {
                this.authStore.setUser(resp.user);
                this.router.navigate(['/home']);
            })
        );
    }

    logout() {
        return this.http.post(`${environment.baseURL}/auth/logout`, 
            {},
            { withCredentials: true }
        )
        .pipe(
            tap(() => {
                this.authStore.clearAuth();
                this.router.navigate(['/login']);
            })
        )
    }

    checkAuth() {
        this.authStore.setCheckingAuth(true);

        return this.http.get<CheckAuthResponse>(`${environment.baseURL}/auth/check-auth`,
            { withCredentials: true }
        )
        .pipe(
            tap((resp) => {
                this.authStore.setUser(resp.user);
            }),
            map(() => true),
            catchError(() => {
                this.authStore.clearAuth();
                return of(false);
            }),
            finalize(() => {
                this.authStore.setCheckingAuth(false);
            })
        );
    }

    refresh(){
        return this.http.post(`${environment.baseURL}/auth/refresh`, 
            {},
            { withCredentials: true }
        );
    }

    createUserAccount(email: string, password: string, passwordConfirm: string, name: string, lastName: string){
        return this.http.post<CreateUserResponse>(`${environment.baseURL}/user/register`,
            { email, password, passwordConfirm, name, lastName },
            { withCredentials: true }
        );
    }

    userAccountActivation(email: string, codeActivation: string){
        return this.http.post<UserAccountActivationResponse>(`${environment.baseURL}/user/account-activation`,
            { email, codeActivation },
            { withCredentials: true }
        );
    }

    forgotYourPassword(email: string){
        return this.http.post<StandardResponse>(`${environment.baseURL}/auth/forgot-your-password`,
            { email },
            { withCredentials: true}
        );
    }

    validateTokenResetPassword(token: string){
        return this.http.get<ResetPasswordResponse>(`${environment.baseURL}/auth/reset-password/${token}`,
            { withCredentials: true }
        );
    }

    resetPassword(token: string, newPassword: string){
        return this.http.patch<StandardResponse>(`${environment.baseURL}/auth/reset-password`,
            { token, newPassword }
        );
    }

}