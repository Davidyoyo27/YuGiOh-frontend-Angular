import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ProfileService } from '../../services/profile.service';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  selector: 'app-create-player-perfil-page',
  imports: [FormsModule, MessageModule, ToastModule],
  templateUrl: './create-player-perfil-page.html',
  styleUrl: './create-player-perfil-page.css',
  providers: [MessageService]
})
export default class CreatePlayerPerfilPage {
  // injects
  profileService = inject(ProfileService);
  messageService = inject(MessageService);
  authStore = inject(AuthStore);

  // signals
  gameNickName = signal<string>('');

  createGameProfile(): void {
    this.profileService.createGameProfile(this.gameNickName()).subscribe({
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
        });
      },
    });
  }

}
