import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AuthStore } from '../../../auth/store/auth.store';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-player-perfil-page',
  imports: [FormsModule, MessageModule, ToastModule],
  templateUrl: './edit-player-perfil-page.html',
  styleUrl: './edit-player-perfil-page.css',
  providers: [MessageService]
})
export default class EditPlayerPerfilPage {
  // injects
  authStore = inject(AuthStore);
  profileService = inject(ProfileService);
  messageService = inject(MessageService);
  router = inject(Router);

  // signals
  playerNickName = signal<string>('');

  ngOnInit(): void {
    this.playerNickName.set(this.authStore.user()?.nickName ?? '');
  }

  backToMenuOptions(): void {
    this.router.navigate(['/player-perfil/edit-options']);
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
