import { Component, inject, OnInit, signal } from '@angular/core';
import { PlayerLifePoints } from '../../components/player-life-points/player-life-points';
import { ActivatedRoute, Router } from '@angular/router';
import { DuelGameService } from '../../services/duel-game.services';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-duel',
  imports: [PlayerLifePoints, ToastModule, MessageModule, FormsModule],
  templateUrl: './duel.html',
  styleUrl: './duel.css',
  providers: [MessageService]
})
export default class Duel implements OnInit {
  // inject
  route = inject(ActivatedRoute);
  duelGameService = inject(DuelGameService);
  messageService = inject(MessageService);
  router = inject(Router);

  // signals
  duelId = signal<number>(0);
  playerOneId = signal<number>(0);
  playerOneNickName = signal<string>('');
  playerTwoId = signal<number>(0);
  playerTwoNickName = signal<string>('');
  errorData = signal<string>('');
  playerOneLP = signal<number>(8000);
  playerTwoLP = signal<number>(8000);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) return;

    this.duelId.set(Number(id));
    this.getDataPlayers();
  }

  getDataPlayers(): void {

    const duelId = this.duelId();

    if (!duelId) return;

    this.duelGameService.dataPlayersInDuel(duelId).subscribe({
      next: (resp) => {
        // si agun no se une ningun jugador
        if (resp === null) {
          this.playerOneNickName.set('Jugador aún no se une a la sala...');
          this.playerTwoNickName.set('Jugador aún no se une a la sala...');
          return;
        }

        // asignacion datos al propietario de la partida
        this.playerOneNickName.set(resp.creatorNickName);
        this.playerOneId.set(resp.creatorId);
        // asignacion datos del oponente
        this.playerTwoNickName.set(resp.opponentNickName ?? 'Jugador aún no se une a la sala...');
        this.playerTwoId.set(resp.opponentId);
      },
      error: (err) => {
        this.errorData.set(err.error.message);
      },
    });
  }

  playerFinished(player: { profileId: number, finalLP: number }): void {
    this.duelFinish();
  }

  duelFinish(): void {

    if (this.playerTwoId() === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No puedes finalizar el duelo porque el segundo jugador aún no se ha unido.'
      });
      return;
    }

    const players = [
      {
        profileId: this.playerOneId(),
        finalLP: this.playerOneLP(),
      },
      {
        profileId: this.playerTwoId(),
        finalLP: this.playerTwoLP(),
      }
    ];

    this.duelGameService.finishDuel(this.duelId(), players).subscribe({
      next: (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: resp.message,
          life: 4000,
        });
        setTimeout(() => {
          this.router.navigate(['/menu-options-duel']);
        }, 4000);
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
