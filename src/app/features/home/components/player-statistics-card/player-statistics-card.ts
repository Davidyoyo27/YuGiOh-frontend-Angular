import { Component, input } from '@angular/core';

@Component({
  selector: 'app-player-statistics-card',
  imports: [],
  templateUrl: './player-statistics-card.html',
  styleUrl: './player-statistics-card.css',
  standalone: true,
})
export class PlayerStatisticsCard {

  // required obligatorio
  color = input.required<string>();
  // no es obligatorio
  icon = input<string>();
  text = input.required<string>();
  dataNumber = input.required<number>();
  percentage = input<boolean>();

}
