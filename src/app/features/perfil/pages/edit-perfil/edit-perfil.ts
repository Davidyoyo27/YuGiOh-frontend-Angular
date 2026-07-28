import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthStore } from '../../../auth/store/auth.store';
import { ProfileService } from '../../services/profile.service';
import { FormsModule } from "@angular/forms";
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-perfil',
  imports: [FormsModule, MessageModule, ToastModule],
  templateUrl: './edit-perfil.html',
  styleUrl: './edit-perfil.css',
  providers: [MessageService]
})
export default class EditPerfil implements OnInit {
  // injects
  authStore = inject(AuthStore);
  profileService = inject(ProfileService);
  messageService = inject(MessageService);
  router = inject(Router);

  // signals
  userName = signal<string>('');
  userLastName = signal<string>('');
  playerNickName = signal<string>('');

  ngOnInit(): void {
    this.userName.set(this.authStore.user()?.userName ?? '');
    this.userLastName.set(this.authStore.user()?.lastName ?? '');
    this.playerNickName.set(this.authStore.user()?.nickName ?? '');
  }

  backToProfile(): void {
    this.router.navigate(['/player-perfil']);
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

  saveChangesProfile(): void {
    this.profileService.updateUserProfile(this.playerNickName()).subscribe({
      next: (resp) => {
        this.authStore.setUser(resp.user);
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: resp.message,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
          life: 5000,
        });
      },
    });
  }

}
