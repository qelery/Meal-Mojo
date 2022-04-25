import { Component, Input } from '@angular/core';
import { Restaurant } from '@shared/model';

@Component({
  selector: 'app-restaurant-info-card',
  templateUrl: './restaurant-info-card.component.html',
  styleUrls: ['./restaurant-info-card.component.css'],
})
export class RestaurantInfoCardComponent {
  @Input() restaurant: Restaurant;
}
