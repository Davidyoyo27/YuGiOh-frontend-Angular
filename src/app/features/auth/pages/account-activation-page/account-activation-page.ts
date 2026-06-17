import { Component, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-account-activation-page',
  imports: [InputOtpModule, ToastModule, MessageModule, FormsModule],
  templateUrl: './account-activation-page.html',
  styleUrl: './account-activation-page.css',
  providers: [MessageService],
})
export default class AccountActivationPage {
  // injects
  messageService = inject(MessageService);
  authService = inject(AuthService);

  // publics
  public email: string = ('');
  public codeActivation: string = ('');

  // private
  // signals
  errorData = signal<{ num: number, textError: string }[]>([]);
  singleError = signal<string>('');
  isLoading = signal<boolean>(false);

  activateAccount(): void {
    this.authService.userAccountActivation(this.email, this.codeActivation)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (resp) => {

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: resp.message,
            life: 7000,
          });
        },
        
        error: (err) => {

          let dataError = err.error.message;

          if (typeof dataError === 'string') this.singleError.set(dataError);

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
