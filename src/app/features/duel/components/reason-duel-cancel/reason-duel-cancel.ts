import { Component, inject, input, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { DuelGameService } from '../../services/duel-game.services';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reason-duel-cancel',
  imports: [DialogModule, ButtonModule, TextareaModule, FormsModule, MessageModule, ToastModule, RippleModule],
  templateUrl: './reason-duel-cancel.html',
  styleUrl: './reason-duel-cancel.css',
  providers: [MessageService]
})
export class ReasonDuelCancel {
  // injects
  duelGameService = inject(DuelGameService);
  messageService = inject(MessageService);

  visible = model(false);
  cancelReason: string = '';

  // inputs
  duelId = input<number>(0);

  cancelDuel(): void {
    this.duelGameService.cancelDuel(this.duelId(), this.cancelReason).subscribe({
      next: (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
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
