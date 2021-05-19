import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-restaurant-store-front-banner',
  templateUrl: './restaurant-store-front-banner.component.html',
  styleUrls: ['./restaurant-store-front-banner.component.css']
})
export class RestaurantStoreFrontBannerComponent implements OnInit {
  @Input() restaurantName: any;
  @Input() restaurantAddress: any;
  @Input() heroImageUrl: any;

  constructor() {}


  ngOnInit(): void {
  }

}
