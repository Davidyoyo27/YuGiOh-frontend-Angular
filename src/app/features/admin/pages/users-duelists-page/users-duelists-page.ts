import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.services';
import { UserAccount } from '../../interfaces/users-account.interface';
import { Popover, PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-users-duelists-page',
  imports: [FormsModule, TableModule, MessageModule, ToastModule, PopoverModule, ButtonModule, InputTextModule],
  templateUrl: './users-duelists-page.html',
  styleUrl: './users-duelists-page.css',
  providers: [MessageService]
})
export default class UsersDuelistsPage implements OnInit {
  // injects
  adminService = inject(AdminService);
  messageService = inject(MessageService);

  // signals
  users = signal<UserAccount[]>([]);
  selectedUser: UserAccount | null = null;

  ngOnInit(): void {
    this.userDuelists();
  }

  showOptions(event: Event, user: UserAccount, popover: Popover): void {
    this.selectedUser = user;
    popover.toggle(event);
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

  sendActivationEmail(): void {
    if (!this.selectedUser) return;

    const userId = this.selectedUser.id;

    this.adminService.resendEmailActivationAccount(userId).subscribe({
      next: (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: resp.message,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message
        });
      },
    });
  }

}
