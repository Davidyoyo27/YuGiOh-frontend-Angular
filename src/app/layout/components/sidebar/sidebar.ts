import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  authService = inject(AuthService);

  // signals
  isCollapsed = signal<boolean>(false);

  toggleSidebar(): void {
    this.isCollapsed.set(!this.isCollapsed());
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
