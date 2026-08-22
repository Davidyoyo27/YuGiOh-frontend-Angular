import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PlayerStatisticsCard } from '../../../home/components/player-statistics-card/player-statistics-card';
import { PlayerStatistics } from '../../../home/interfaces/player-statistics.interface';
import { HomeService } from '../../../home/services/home.service';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { GameProfileService } from '../../services/game-profile.service';
import { PlayerOption } from '../../interfaces/game-profile.interface';
import { PlayerVsStatistics } from '../../../home/interfaces/player-vs-statistics.interface';

@Component({
  selector: 'app-statistics-vs-opponents-page',
  imports: [PlayerStatisticsCard, ChartModule, SelectModule, FormsModule],
  templateUrl: './statistics-vs-opponents-page.html',
  styleUrl: './statistics-vs-opponents-page.css',
})
export default class StatisticsVsOpponentsPage implements OnInit {
  // injects
  homeService = inject(HomeService);
  gameProfileService = inject(GameProfileService);

  // signals
  playerStatistics = signal<PlayerStatistics | null>(null);
  playerVsStatistics = signal<PlayerVsStatistics | null>(null);
  errorData = signal<string>('');
  playerVictories = signal<number>(0);
  playerDefeats = signal<number>(0);
  playerTies = signal<number>(0);
  playerPercentageVictories = signal<number>(0);
  playerPercentageDefeats = signal<number>(0);
  playerPercentageTies = signal<number>(0);
  playerTotalDuelsGames = signal<number>(0);
  // opciones del combobox
  optionsSelect = signal<PlayerOption[]>([]);
  // oponente seleccionado del combobox
  selectedOpponent = signal<number | null>(null);
  opponentNickName = signal<string>('');
  options = signal<Object>({
    plugins: {
      legend: {
        position: 'none',
        labels: {
          color: '#ffffff'
        }
      }
    }
  });

  // computed
  data = computed(() => ({
    labels: ['Victorias', 'Derrotas', 'Empates'],
    datasets: [
      {
        data: [this.playerVictories(), this.playerDefeats(), this.playerTies()],
        backgroundColor: [
          '#22c55e',
          '#ef4444',
          '#d4af37'
        ],
        borderColor: '#141414',
        borderWidth: 3,
        hoverOffset: 8
      }
    ]
  }));

  selectedOpponentNickname = computed(() => {
  const opponent = this.optionsSelect().find(
    player => player.id === this.selectedOpponent()
  );

  return opponent?.nickName ?? '';
});

  ngOnInit(): void {
    this.loadPlayersNickname();
  }

  loadPlayersNickname(): void {
    this.gameProfileService.playersNickName().subscribe({
      next: (resp) => {
        this.optionsSelect.set(resp);
      },
      error: (err) => {
        this.errorData.set(err.error.message);
      },
    });
  }

  loadStatisticsPlayerVsPlayer(): void {

    const opponentId = this.selectedOpponent();

    if (!opponentId) return;

    this.homeService.playerVsPlayerStatistics(opponentId).subscribe({
      next: (resp) => {
        this.playerVsStatistics.set(resp);
        this.opponentNickName.set(resp.nickNameOpponent);
        this.playerTotalDuelsGames.set(resp.totalDuels);
        this.playerVictories.set(resp.winsPlayer1);
        this.playerPercentageVictories.set(resp.percentagePlayer1);
        this.playerDefeats.set(resp.winsPlayer2);
        this.playerPercentageDefeats.set(resp.percentagePlayer2);
        this.playerTies.set(resp.ties);
        this.playerPercentageTies.set(resp.percentageDrawPlayers);
      },
      error: (err) => {
        this.errorData.set(err.error.message);
      },
    });
  }
}
