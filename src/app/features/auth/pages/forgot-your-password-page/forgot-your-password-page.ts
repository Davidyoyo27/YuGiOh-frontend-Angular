import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-your-password-page',
  imports: [RouterLink, FormsModule, MessageModule, ToastModule, MessageModule],
  templateUrl: './forgot-your-password-page.html',
  styleUrl: './forgot-your-password-page.css',
  providers: [MessageService],
})
export default class ForgotYourPasswordPage {
  // injects
  authService = inject(AuthService);
  messageService = inject(MessageService);

  // publics
  public email: string = ('');

  // signals
  errorData = signal<{ num: number, textError: string }[]>([]);
  isLoading = signal<boolean>(false);

  forgotYourPassword() {
    this.authService.forgotYourPassword(this.email)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (resp) => {

          this.errorData.set([]);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: resp.message,
            life: 7000,
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
