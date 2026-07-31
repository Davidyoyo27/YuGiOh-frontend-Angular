import { AuthStore } from './../../../auth/store/auth.store';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-user-account-page',
  imports: [FormsModule, MessageModule, ToastModule],
  templateUrl: './edit-user-account-page.html',
  styleUrl: './edit-user-account-page.css',
  providers: [MessageService]
})
export default class EditUserAccountPage implements OnInit {
  // injects
  messageService = inject(MessageService);
  router = inject(Router);
  profileService = inject(ProfileService);
  authStore = inject(AuthStore);

  // signals
  userName = signal<string>('');
  userLastName = signal<string>('');

  ngOnInit(): void {
    this.userName.set(this.authStore.user()?.userName ?? '');
    this.userLastName.set(this.authStore.user()?.lastName ?? '');
  }

  backToMenuOptions(): void{
    this.router.navigate(['/player-perfil/edit-options']);
  }

  saveChangesUserAccount(): void {

    const body: { name?: string, lastName?: string } = {};

    if (this.userName().trim()) {
      body.name = this.userName().trim();
    }

    if (this.userLastName().trim()) {
      body.lastName = this.userLastName().trim();
    }

    this.profileService.updateUserAccount(body).subscribe({
      next: (resp) => {
        this.authStore.setUser(resp.user);
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: resp.message,
        });
      },
      error: (err) => {
        err.error.message.map((item: string) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: item,
            life: 5000,
          });
        });
      },
    });
  }

}
