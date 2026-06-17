import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { LoadingState } from "../../components/reset-password-form/loading-state/loading-state";
import { ResetPasswordForm } from "../../components/reset-password-form/reset-password-form/reset-password-form";
import { InvalidTokenState } from '../../components/reset-password-form/invalid-token-state/invalid-token-state';

@Component({
  selector: 'app-reset-password-page',
  imports: [LoadingState, ResetPasswordForm, InvalidTokenState],
  templateUrl: './reset-password-page.html',
})
export default class ResetPasswordPage implements OnInit {
  // privates
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  // publics
  public token: string = '';

  // signals
  isLoading = signal<boolean>(false);
  tokenValid = signal<boolean>(false);
  email = signal<string>('');

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';

    this.authService.validateTokenResetPassword(this.token)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (resp) => {
          this.email.set(resp.email);
          this.tokenValid.set(true);
        },
        error: () => {
          this.tokenValid.set(false);
        },
      });
  }

}
