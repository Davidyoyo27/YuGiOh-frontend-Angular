import { Component, inject, OnInit, signal } from '@angular/core';
import { DuelGameService } from '../../services/duel-game.services';
import { CanceledDuel } from '../../interfaces/canceled-duels.interface';
import { formatDateHourZone } from '../../../../shared/utils/format-date-hour-zone.utils';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-canceled-duels-page',
  imports: [ButtonModule, ConfirmDialogModule, FormsModule, MessageModule, ToastModule],
  templateUrl: './canceled-duels-page.html',
  styleUrl: './canceled-duels-page.css',
  providers: [ConfirmationService, MessageService]
})
export default class CanceledDuelsPage implements OnInit {
  // injects
  duelGameService = inject(DuelGameService);

  // signals
  errorData = signal<string>('');
  dataDuelsCanceled = signal<CanceledDuel[]>([]);

  // privates
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.duelsCanceled();
  }

  duelsCanceled(): void {
    this.duelGameService.canceledDuels().subscribe({
      next: (resp) => {
        const duelsFormatted = resp.map((duels) => ({
          ...duels,
          cancellationRequestedAt: duels.cancellationRequestedAt
            ? formatDateHourZone(duels.cancellationRequestedAt)
            : null,
        }));

        this.dataDuelsCanceled.set(duelsFormatted);
      },
      error: (err) => {
        this.errorData.set(err.error.message);
      },
    });
  }

  confirm(event: Event, duelId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      key: 'firstConfirmation',
      message: '¿Estas seguro que deseas aceptar la "cancelación del duelo"?',
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Confirmar Cancelación'
      },
      accept: () => {
        this.confirmationService.confirm({
          key: 'secondConfirmation',
          header: 'Confirmación Final',
          message: 'IMPORTANTE: Esta acción no es reversible. Última oportunidad para confirmar. \n ¿Deseas continuar?',
          icon: 'pi pi-exclamation-circle',
          acceptButtonProps: {
            label: 'Sí, confirmar cancelación',
            severity: 'danger'
          },
          rejectButtonProps: {
            label: 'No, volver',
            severity: 'secondary',
            outlined: true
          },
          accept: () => {
            this.cancelDuel(duelId, true);
          }
        });
      },
    });
  }

  refuse(event: Event, duelId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro que deseas rechazar la "cancelación del duelo"?',
      header: 'Zona de Peligro',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Rechazar Cancelación',
        severity: 'danger'
      },

      accept: () => {
        this.confirmationService.confirm({
          key: 'secondConfirmation',
          header: 'Confirmación Final',
          message: 'IMPORTANTE: Esta acción no es reversible. Última oportunidad para confirmar. \n ¿Deseas continuar?',
          icon: 'pi pi-exclamation-circle',
          acceptButtonProps: {
            label: 'Sí, rechazar cancelación',
            severity: 'danger'
          },
          rejectButtonProps: {
            label: 'No, volver',
            severity: 'secondary',
            outlined: true
          },
          accept: () => {
            this.cancelDuel(duelId, true);
          }
        });
      },
    });
  }

  cancelDuel(duelId: number, confirmationDuel: boolean): void {
    this.duelGameService.confirmationCancelDuel(duelId, confirmationDuel).subscribe({
      next: (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: resp.message
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message
        });
      },
    });
  }

}
