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
      roles: [2],
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
      label: 'Administración',
      icon: 'fa-solid fa-gears',
      route: '/admin',
      roles: [3],
    },
  ];

  // signals
  isCollapsed = signal<boolean>(false);
  isInitialized = signal(false);

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
