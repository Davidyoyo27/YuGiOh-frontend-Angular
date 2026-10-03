import { Component, inject, input, output, signal } from '@angular/core';
import { DuelGameService } from '../../services/duel-game.services';

@Component({
  selector: 'app-player-life-points',
  imports: [],
  templateUrl: './player-life-points.html',
  styleUrl: './player-life-points.css',
})
export class PlayerLifePoints {
  // injects
  duelGameService = inject(DuelGameService);

  // inputs
  duelId = input.required<number>();
  playerId = input.required<number>();
  playerNickName = input.required<string>();

  // outputs
  playerFinished = output<{
    profileId: number;
    finalLP: number;
  }>();
  playerLifePointsChanged = output<number>();

  // signals
  lifePointsPlayer = signal<number>(8000);
  lifePointsCalculated = signal<number>(0);

  addPoints() {
    this.lifePointsPlayer.update(current => current + this.lifePointsCalculated());
    this.lifePointsCalculated.set(0);
    // emit que manda constantemente los LP del jugador al padre
    this.playerLifePointsChanged.emit(this.lifePointsPlayer());
  }

  restPoints() {
    this.lifePointsPlayer.update(current => current - this.lifePointsCalculated());

    if (this.lifePointsPlayer() <= 0) {
      this.lifePointsPlayer.set(0);
      this.lifePointsCalculated.set(0);

      // emit avisamos al padre que los LP llegaron a 0
      this.playerLifePointsChanged.emit(this.lifePointsPlayer());

      // se dispara el emit cuando los LP de un jugador lleguen a cero
      this.duelFinish();
      return;
    }

    this.lifePointsCalculated.set(0);
    // emitimos los LP actuales al padre
    this.playerLifePointsChanged.emit(this.lifePointsPlayer());
  }

  add(value: number) {
    this.lifePointsCalculated.update(current => current + value);
  }

  clearlifePointsCalculated() {
    this.lifePointsCalculated.set(0);
  }

  // emit que manda los datos devuelta hacia el padre
  duelFinish() {
    this.playerFinished.emit({
      profileId: this.playerId(),
      finalLP: this.lifePointsPlayer()
    });
  }

}
