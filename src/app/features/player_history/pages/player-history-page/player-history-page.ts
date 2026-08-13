import { Component, inject, OnInit, signal } from '@angular/core';
import { RecordService } from '../../services/record.service';
import { PlayerHistoryDuels } from '../../interfaces/player-history-duel.interface';
import { TableModule } from 'primeng/table';
import { formatDateHourZone } from '../../../../shared/utils/format-date-hour-zone.utils';

@Component({
  selector: 'app-player-history-page',
  imports: [TableModule],
  templateUrl: './player-history-page.html',
  styleUrl: './player-history-page.css',
})
export default class PlayerHistoryPage implements OnInit {
  // injects
  recordService = inject(RecordService);

  // signals
  playerHistoryDuels = signal<PlayerHistoryDuels[]>([]);
  errorData = signal<string>('');

  ngOnInit(): void {
    this.dataHistoryDuels();
  }

  dataHistoryDuels() {
    return this.recordService.playerHistoryDuels().subscribe({
      next: (resp) => {
        const response = resp.map((duel) => {
          const dateFormated = formatDateHourZone(duel.finishedAt);
          return {
            result: duel.result,
            opponent: duel.opponent,
            finalLP: duel.finalLP,
            finishedAt: dateFormated,
          }
        });

        this.playerHistoryDuels.set(response);
      },
      error: (err) => {
        this.errorData.set(err.error.message);
      },
    });
  }

}
