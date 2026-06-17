import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export default class LoginPage {
  // injects
  authService = inject(AuthService);

  // publics
  public showPassword: boolean = false;
  public email: string = '';
  public password: string = '';

  // signals
  errorData = signal<{ num: number, textError: string }[]>([]);
  errorAccount = signal<string>('');
  isLoading = signal<boolean>(false);

  changePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.isLoading.set(true);
    this.authService.login(this.email, this.password)
      .pipe(
        // finalize para no tener que poner la bandera del isLoading al final de cada seccion de codigo
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({

        next: () => {

          this.errorData.set([]);
          this.errorAccount.set('');
        },

        error: (err) => {
          let dataError = err.error.message;

          if(Array.isArray(dataError)){
            this.errorData.set(dataError.map((userErr: string, index: number) => {
              return {
                num: index + 1,
                textError: userErr,
              }
            }));

            return;
          }
          
          this.errorData.set([]);
          this.errorAccount.set(err.error.message);
        },

      });
  }
}
