import { Component, computed, inject, signal, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from "@angular/router";
import { AuthStore } from '../../../features/auth/store/auth.store';
import { MenuOption } from '../../interfaces/menu-option.interface';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  authService = inject(AuthService);
  authStore = inject(AuthStore);
  router = inject(Router);

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
      route: '/superadmin-users-list',
      roles: [4],
    },
  ];

  // signals
  isCollapsed = signal<boolean>(false);
  isInitialized = signal(false);

  isPlayer = computed(() => this.authStore.user()?.role?.id === 2);
  isAdmin = computed(() => this.authStore.user()?.role?.id === 3);
  isSuperAdmin = computed(() => this.authStore.user()?.role?.id === 4);

  ngOnInit(): void {
    this.setInitialSidebarState();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (window.innerWidth <= 768) {
          this.isCollapsed.set(true);
        }
      });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setInitialSidebarState();
  }

  private setInitialSidebarState(): void {
    const isMobile = window.innerWidth <= 768;

    this.isCollapsed.set(isMobile);
  }

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
