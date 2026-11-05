import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.services';
import { UserAccount } from '../../interfaces/users-account.interface';

@Component({
  selector: 'app-users-duelists-page',
  imports: [FormsModule, TableModule, MessageModule, ToastModule],
  templateUrl: './users-duelists-page.html',
  styleUrl: './users-duelists-page.css',
  providers: [MessageService]
})
export default class UsersDuelistsPage implements OnInit {
  // injects
  adminService = inject(AdminService);

  // signals
  users = signal<UserAccount[]>([]);
  selectedUser = signal<UserAccount | null>(null);

  ngOnInit(): void {
    this.userDuelists();
  }

  userDuelists(): void {
    this.adminService.usersDuelists().subscribe({
      next: (resp) => {
        this.users.set(resp);
      },
      error: () => {
      },
    });
  }

}
