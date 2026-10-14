import { Component, inject, input, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DuelGameService } from '../../services/duel-game.services';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ReasonDuelCancel } from '../reason-duel-cancel/reason-duel-cancel';

@Component({
  selector: 'app-duel-options',
  imports: [DialogModule, ButtonModule, TextareaModule, FormsModule, ReasonDuelCancel],
  templateUrl: './duel-options.html',
  styleUrl: './duel-options.css',
})
export class DuelOptions {
  // inject
  duelGameService = inject(DuelGameService);

  // inputs
  duelId = input.required<number>();

  visible: boolean = false;
  visibleCancelReason = model(false);

  showDialog() {
    this.visible = true;
  }

  showDialogCancelReason() {
    this.visibleCancelReason.set(true);
  }

}
