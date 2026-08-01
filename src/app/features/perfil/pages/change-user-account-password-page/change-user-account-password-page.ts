import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-user-account-password-page',
  imports: [FormsModule, MessageModule, ToastModule],
  templateUrl: './change-user-account-password-page.html',
  styleUrl: './change-user-account-password-page.css',
  providers: [MessageService]
})
export default class ChangeUserAccountPasswordPage {
  // injects
  router = inject(Router);
  userService = inject(UserService);
  messageService = inject(MessageService);

  // signal
  password = signal<string>('');
  passwordConfirm = signal<string>('');
  currentPassword = signal<string>('');
  errorData = signal<{ num: number; textError: string; }[]>([]);

  backToMenuOptions(): void {
    this.router.navigate(['/player-perfil/edit-options']);
  }

  saveNewPassword(): void {

    if (this.password() !== this.passwordConfirm()) {
      return this.errorData.set([{ num: 0, textError: 'La nueva contraseña y la confirmación de la contraseña no coinciden.' }]);
    }

    this.userService.changeUserAccountPassword(this.currentPassword(), this.password(), this.passwordConfirm()).subscribe({
      next: (resp) => {
        this.errorData.set([]);
        this.currentPassword.set('');
        this.password.set('');
        this.passwordConfirm.set('');
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: resp.message,
        });
      },
      error: (err) => {
        let dataError = err.error.message;

        if (Array.isArray(dataError)) {
          this.errorData.set(dataError.map((useErr: string, index: number) => {
            return {
              num: index + 1,
              textError: useErr
            }
          }));

          return;
        }

        this.errorData.set([]);
      },
    });
  }

}
