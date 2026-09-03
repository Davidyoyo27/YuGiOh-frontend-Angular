import { Component, inject, OnInit, signal } from '@angular/core';
import { DuelRoom } from '../../interfaces/duel-room-interface';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DuelGameService } from '../../services/duel-game.services';
import { formatDateHourZone } from '../../../../shared/utils/format-date-hour-zone.utils';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  selector: 'app-duels-rooms-list-page',
  imports: [FormsModule, TableModule, MessageModule, ToastModule],
  templateUrl: './duels-rooms-list-page.html',
  styleUrl: './duels-rooms-list-page.css',
  providers: [MessageService]
})
export default class DuelsRoomsListPage implements OnInit {
  // injects
  duelGameService = inject(DuelGameService);
  messageService = inject(MessageService);
  authStore =  inject(AuthStore);

  // publics
  public validationNotProfilePlayer: string = 'Debes tener un perfil de jugador creado para poder visualizar las salas de duelos creadas.';

  // signals
  duelRooms = signal<DuelRoom[]>([]);
  selectedRoom = signal<DuelRoom | null>(null);

  ngOnInit(): void {
    this.duelsRoomsCreated();
  }

  duelsRoomsCreated(): void {
    this.duelGameService.duelsRooms().subscribe({
      next: (resp) => {
        const dataConverted = resp.map((duel) => {
          const dateFormated = formatDateHourZone(duel.duelDateCreated);
          return {
            id: duel.id,
            roomName: duel.roomName,
            type: duel.type,
            playersJoined: duel.playersJoined,
            maxPlayers: duel.maxPlayers,
            roomCreatedBy: duel.roomCreatedBy,
            duelDateCreated: dateFormated,
            status: duel.status,
          }
        });
        this.duelRooms.set(dataConverted);
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
