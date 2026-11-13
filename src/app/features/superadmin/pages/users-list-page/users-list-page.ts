import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserAccount } from '../../../admin/interfaces/users-account.interface';
import { SuperAdminService } from '../../services/superadmin.service';
import { SelectModule } from 'primeng/select';
import { Popover, PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-users-list-page',
  imports: [FormsModule, TableModule, MessageModule, ToastModule, SelectModule, PopoverModule, ButtonModule],
  templateUrl: './users-list-page.html',
  styleUrl: './users-list-page.css',
  providers: [MessageService]
})
export default class UsersListPage implements OnInit {
  // injects
  messageService = inject(MessageService);
  superAdminService = inject(SuperAdminService);

  // signals
  users = signal<UserAccount[]>([]);
  selectedUser: UserAccount | null = null;
  filteredUsers = signal<UserAccount[]>([]);
  selectedUserType: number | null = null;

  userTypes = [
    { label: 'Todos los usuarios', value: null },
    { label: 'Duelistas', value: 2 },
    { label: 'Administradores', value: 3 },
  ];

  ngOnInit(): void {
    this.userList();
  }

  showOptions(event: Event, user: UserAccount, popover: Popover): void {
    this.selectedUser = user;
    popover.toggle(event);
  }

  userList(): void {
    this.superAdminService.usersList().subscribe({
      next: (resp) => {
        this.users.set(resp);
        this.filteredUsers.set(resp);
      },
      error: (err) => {
      },
    });
  }

  filterUsers(): void {
    const users = this.users();

    if (this.selectedUserType === null) {
      this.filteredUsers.set(users);
      return;
    }

    this.filteredUsers.set(
      users.filter(user => user.typeUser?.id === this.selectedUserType)
    );
  }

  blockUserAccount(): void {
    if (!this.selectedUser) return;

    const userId = this.selectedUser.id;
    const userIsActive = this.selectedUser.isActive;

    this.superAdminService.blockUserAccount(userId, userIsActive).subscribe({
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
