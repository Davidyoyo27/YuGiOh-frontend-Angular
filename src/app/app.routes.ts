import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { MainLayout } from './layout/pages/main-layout/main-layout';
import { hasProfileGuard } from './core/guards/has-profile-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login-page/login-page'),
        canActivate: [guestGuard]
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
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./features/home/pages/home-page/home-page'),
            },
            {
                path: 'player-perfil',
                loadComponent: () => import('./features/perfil/pages/player-perfil/player-perfil'),
            },
            {
                path: 'player-perfil/edit-perfil',
                loadComponent: () => import('./features/perfil/pages/edit-perfil/edit-perfil'),
            },
            {
                path: 'player-perfil/create-perfil',
                loadComponent: () => import('./features/perfil/pages/create-player-perfil-page/create-player-perfil-page'),
                // guard que verifica si ya contiene un perfil de jugador creado el usuario y redireccion automatica
                canActivate: [hasProfileGuard],
            }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
