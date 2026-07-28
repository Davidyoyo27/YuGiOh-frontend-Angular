import { Component, inject, OnInit, signal } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { LastDuels } from '../../interfaces/player-lasts-duels.interface';
import { relativeTime } from '../../../../shared/utils/relative-time.util';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  selector: 'app-player-lasts-duels',
  imports: [],
  templateUrl: './player-lasts-duels.html',
  styleUrl: './player-lasts-duels.css',
})
export class PlayerLastsDuels implements OnInit {
  // injects
  homeService = inject(HomeService);
  authStore = inject(AuthStore);

  // signals
  errorData = signal<string>('');
  statisticsPlayer = signal<LastDuels[]>([]);

  ngOnInit(): void {
    this.homeService.playerLastsDuels().subscribe({
      next: (resp) => {
        this.statisticsPlayer.set(resp);

        // mapeamos los datos que llegan para poder pasarle a la funcion relativeTime 
        // y transforme la fecha de su valor a "hace 1 dia", "hace 2 semanas", etc.
        const finalResult = resp.map(item => ({
          ...item,
          relativeDate: relativeTime(item.session_finished_at),
        }));

        this.statisticsPlayer.set(finalResult);
      },
      error: (err) => {
        this.errorData.set(err.error.message);
      },
    });
  }

}
