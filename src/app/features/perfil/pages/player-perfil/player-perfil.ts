import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PlayerPerfilData } from '../../components/player-perfil-data/player-perfil-data';
import { PlayerStatisticsCard } from '../../../home/components/player-statistics-card/player-statistics-card';
import { HomeService } from '../../../home/services/home.service';
import { PlayerStatistics } from '../../../home/interfaces/player-statistics.interface';
import { AuthStore } from '../../../auth/store/auth.store';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-player-perfil',
  imports: [PlayerPerfilData, PlayerStatisticsCard, FormsModule],
  templateUrl: './player-perfil.html',
  styleUrl: './player-perfil.css',
})
export default class PlayerPerfil implements OnInit {
  // injects
  homeService = inject(HomeService);
  authStore = inject(AuthStore);
  router = inject(Router);

  // signals
  playerStatistics = signal<PlayerStatistics | null>(null);
  errorData = signal<string>('');
  playerNickName = signal<string>(this.authStore.user()?.nickName ?? 'Sin apodo');

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.homeService.playerStatistics().subscribe({
      next: (resp) => {
        this.playerStatistics.set(resp);
      },
      error: (err) => {
        this.errorData.set(err.error.message);
      }
    });
  }

  playerAvatarImageUrl = computed(() => this.authStore.playerAvatar());
  // se uso el computed solo para la fecha y no un signal como en el nickName ya que se 
  // necesitaba hacer una transformacion de la fecha que venia desde la BD
  playerDateCreated = computed(() => {
    const dateCreated = this.authStore.user()?.createdAt;

    if (!dateCreated) return 'Sin fecha de creación';

    // fecha de zona horaria desde chile
    const dateZoneChile = new Date(dateCreated).toLocaleDateString('es-CL');
    const dateCreatedSplited = dateZoneChile.split('-');

    const year = dateCreatedSplited?.[2];
    const month = dateCreatedSplited?.[1];
    const day = dateCreatedSplited?.[0];

    const finalDate = `${day}/${month}/${year}`;

    return finalDate;
  });

  goToProfileEdit(): void {
    this.router.navigate(['/player-perfil/edit-perfil']);
  }

  goToCreateProfile(): void {
    this.router.navigate(['/player-perfil/create-perfil']);
  }

}
