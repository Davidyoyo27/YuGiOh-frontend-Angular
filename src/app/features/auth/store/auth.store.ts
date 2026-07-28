import { User } from '../interfaces/user.interface';
import { AuthState } from './../interfaces/auth-state.interface';
import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthStore {
    private state = signal<AuthState>({
        user: null,
        isAuthenticated: false,
        // si es true "todavia no se si el usuario esta autenticado o no."
        isCheckingAuth: true,
    });
    defaultAvatar = signal<string>('');

    public user = computed(() => this.state().user);
    public isAuthenticated = computed(() => this.state().isAuthenticated);
    public isCheckingAuth = computed(() => this.state().isCheckingAuth);

    playerAvatar = computed(() => this.user()?.avatarUrl ?? this.defaultAvatar());

    setUser(user: User): void {
        this.state.update(state => ({
            ...state,
            user,
            isAuthenticated: true,
            isCheckingAuth: false
        }));
    }

    clearAuth(): void {
        this.state.update(state => ({
            ...state,
            user: null,
            isAuthenticated: false,
            isCheckingAuth: false
        }));
    }

    setCheckingAuth(value: boolean): void {
        this.state.update(state => ({
            ...state,
            isCheckingAuth: value
        }));
    }

    setDefaultAvatar(url: string): void {
        this.defaultAvatar.set(url);
    }

}