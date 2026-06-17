import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule, RouterLink, ToastModule, RippleModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
  providers: [MessageService]
})
export default class RegisterPage {
  // injects
  authService = inject(AuthService);
  router = inject(Router);

  // publics
  public email: string = '';
  public password: string = '';
  public passwordConfirm: string = '';
  public name: string = '';
  public lastName: string = '';
  public timeMessageAndRedirection: number = 7000;

  // privates
  private messageService = inject(MessageService);

  // signals
  errorData = signal<{ num: number, textError: string }[]>([]);
  isLoading = signal<boolean>(false);

  createUser() {
    this.isLoading.set(true);
    this.authService.createUserAccount(
      this.email,
      this.password,
      this.passwordConfirm,
      this.name,
      this.lastName,
    )
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({

        next: (resp) => {

          this.errorData.set([]);
          this.email = '';
          this.password = '';
          this.passwordConfirm = '';
          this.name = '';
          this.lastName = '';

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: resp.message,
            life: this.timeMessageAndRedirection
          });

          setTimeout(() => {
            this.router.navigate(['/account_activation']);
          }, this.timeMessageAndRedirection);
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
