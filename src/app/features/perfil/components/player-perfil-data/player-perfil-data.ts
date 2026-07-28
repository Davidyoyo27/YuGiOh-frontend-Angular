import { Component, inject, input, signal } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  selector: 'app-player-perfil-data',
  imports: [MessageModule, ToastModule],
  templateUrl: './player-perfil-data.html',
  styleUrl: './player-perfil-data.css',
  providers: [MessageService]
})
export class PlayerPerfilData {
  // injects
  profileService = inject(ProfileService);
  messageService = inject(MessageService);
  authStore = inject(AuthStore);

  // parametros que solicita el componente
  playerNickName = input.required<string>();
  playerDateCreated = input.required<string>();
  playerAvatarImageUrl = input.required<string>();

  // signals
  isLoading = signal<boolean>(false);

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];
    const maxSize = 2 * 1024 * 1024;  // 2MB

    if (file.size > maxSize) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La imagen no puede superar los 2MB',
        life: 7000,
      });
      return;
    }

    // servicio para subir la imagen de perfil del jugador
    this.profileService.uploadAvatarPlayerProfile(file)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (resp) => {
          this.authStore.setUser(resp.user);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: resp.message,
            life: 7000,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
            life: 7000,
          });
        },
      });
  }

}
