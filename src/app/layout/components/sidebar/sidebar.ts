import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthStore } from '../../../features/auth/store/auth.store';
import { MenuOption } from '../../interfaces/menu-option.interface';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  authService = inject(AuthService);
  authStore = inject(AuthStore);

  private menuOptions: MenuOption[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      route: '/home',
      roles: [2, 3, 4],
    },
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      route: '/player-perfil',
      roles: [2],
    },
    {
      label: 'Historial',
      icon: 'pi pi-calendar',
      route: '/player-history',
      roles: [2],
    },
    {
      label: 'Vs Oponente',
      icon: 'pi pi-chart-bar',
      route: '/player-vs-player-statistics',
      roles: [2],
    },
    {
      label: 'Duelos',
      icon: 'fa-solid fa-shield-halved',
      route: '/menu-options-duel',
      roles: [2],
    },
    {
      label: 'Duelistas',
      icon: 'pi pi-users',
      route: '/admin-users-duelists',
      roles: [3],
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      route: '/admin',
      roles: [4],
    },
  ];

  // signals
  isCollapsed = signal<boolean>(false);
  isInitialized = signal(false);

  isPlayer = computed(() => this.authStore.user()?.role?.id === 2);
  isAdmin = computed(() => this.authStore.user()?.role?.id === 3);
  isSuperAdmin = computed(() => this.authStore.user()?.role?.id === 4);

  menu = computed(() => {
    const roleId = this.authStore.user()?.role?.id;

    return this.menuOptions.filter(option =>
      roleId !== undefined && option.roles.includes(roleId)
    );
  });

  toggleSidebar(): void {
    this.isCollapsed.set(!this.isCollapsed());
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
