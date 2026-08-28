import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TypesTablesService } from '../../../../shared/services/types-tables.service';
import { TypeDuelOption } from '../../interfaces/type-duel.interface';
import { DuelGameService } from '../../services/duel-game.services';
import { AuthStore } from '../../../auth/store/auth.store';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-duel-page',
  imports: [SelectModule, FormsModule, MessageModule, ToastModule],
  templateUrl: './create-duel-page.html',
  styleUrl: './create-duel-page.css',
  providers: [MessageService]
})
export default class CreateDuelPage implements OnInit {
  // injects
  typesTablesService = inject(TypesTablesService);
  duelGameService = inject(DuelGameService);
  authStore = inject(AuthStore);
  messageService = inject(MessageService);
  router = inject(Router);

  // publics
  public roomName: string = '';
  public playersNumber: number = 0;
  public validationNotProfilePlayer: string = 'Debes tener un perfil de jugador creado para poder crear duelos.';

  // signals
  errorData = signal<string>('');
  // opciones del combobox
  optionsSelect = signal<TypeDuelOption[]>([]);
  // oponente seleccionado del combobox
  selectedTypeDuel = signal<number | null>(null);
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

  ngOnInit(): void {
    this.loadTypesDuels();
  }

  loadTypesDuels(): void {
    this.typesTablesService.typesDuels().subscribe({
      next: (resp) => {
        this.optionsSelect.set(resp);
      },
      error: (err) => {
        this.errorData.set(err.error.message);
      },
    });
  }

  createDuelGame(): void {

    const typeDuelSelected = this.selectedTypeDuel();

    if (typeDuelSelected === null) {
      return;
    }

    this.duelGameService.createDuel(this.roomName, this.playersNumber, typeDuelSelected).subscribe({
      next: (resp) => {
        this.selectedTypeDuel.set(null);
        this.roomName = '';
        this.playersNumber = 0;
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

  backToHome(): void {
    this.router.navigate(['/home']);
  }

}
