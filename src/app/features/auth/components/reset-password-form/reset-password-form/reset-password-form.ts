import { Component, inject, Input, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from "@angular/forms";
import { finalize } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-reset-password-form',
  imports: [FormsModule, RouterLink, MessageModule, ToastModule, RippleModule],
  templateUrl: './reset-password-form.html',
  styleUrl: './reset-password-form.css',
  standalone: true,
  providers: [MessageService]
})
export class ResetPasswordForm {
  // injects
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);

  // publics
  public password: string = '';
  public confirmPassword: string = '';

  // signals
  isLoading = signal<boolean>(false);
  errorData = signal<{ num: number, textError: string }[]>([]);

  @Input()
  token!: string;
  @Input()
  email!: string;

  resetPassword() {

    // validacion para que las contraseñas sean iguales
    if (this.password !== this.confirmPassword) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Las contraseñas no coinciden.'
      });

      return;
    }

    this.authService.resetPassword(this.token, this.password)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({

        next: (resp) => {
          this.password = '';
          this.confirmPassword = '';
          this.errorData.set([]);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: resp.message,
            life: 7000
          });
        },
        
        error: (err) => {

          if (err.error.statusCode === 404)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 })

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
