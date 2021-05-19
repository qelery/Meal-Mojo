import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-restaurant-info-card',
  templateUrl: './restaurant-info-card.component.html',
  styleUrls: ['./restaurant-info-card.component.css']
})
export class RestaurantInfoCardComponent implements OnInit {
  @Input() restaurant: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.restaurant.menuItems)
  }

}
