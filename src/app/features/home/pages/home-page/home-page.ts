import { Component, inject, OnInit, signal } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { PlayerStatistics } from '../../interfaces/player-statistics.interface';
import { PlayerStatisticsCard } from "../../components/player-statistics-card/player-statistics-card";
import { PlayerLastsDuels } from '../../components/player-lasts-duels/player-lasts-duels';

@Component({
  selector: 'app-home-page',
  imports: [PlayerStatisticsCard, PlayerLastsDuels],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export default class HomePage implements OnInit {
  // injects
  homeService = inject(HomeService);

  // signals
  playerStatistics = signal<PlayerStatistics | null>(null);
  errorData = signal<string>('');
  titleWelcome = signal<string>('');

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.homeService.playerStatistics().subscribe({
      next: (resp) => {
        this.playerStatistics.set(resp);
        this.titleWelcome.set('¡Bienvenido, Duelista!');
      },
      error: (err) => {
        this.errorData.set(err.error.message);
        this.titleWelcome.set('¡Bienvenido, Dueli... casi, o eso me gustaría decir!');
      },
    });
  }

}
