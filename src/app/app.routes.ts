import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login-page/login-page'),
        canActivate: [guestGuard]
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/pages/home-page/home-page'),
        canActivate: [authGuard]
    },
    {
        path: 'register_account',
        loadComponent: () => import('./features/auth/pages/register-page/register-page'),
        canActivate: [guestGuard]
    },
    {
        path: 'account_activation',
        loadComponent: () => import('./features/auth/pages/account-activation-page/account-activation-page'),
        canActivate: [guestGuard]
    },
    {
        path: 'forgot-your-password',
        loadComponent: () => import('./features/auth/pages/forgot-your-password-page/forgot-your-password-page'),
        canActivate: [guestGuard]
    },
    {
        path: 'reset-password/:token',
        loadComponent: () => import('./features/auth/pages/reset-password-page/reset-password-page'),
        canActivate: [guestGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
