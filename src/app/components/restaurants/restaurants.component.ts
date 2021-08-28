import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order/order.service";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  nearbyRestaurants: any[] | null;
  currentAddress: string | null ;
  heroImageUrl: string;
  constructor(public orderService: OrderService) {
    this.heroImageUrl = "assets/image/store-front-hero-image.jpg";
  }

  ngOnInit(): void {
    this.orderService.getRestaurantsNearUser().subscribe((response: any) => {
      this.nearbyRestaurants = response;
      for (let x of this.nearbyRestaurants) {
        console.log(x);
      }
    }, (err: any) => console.log(err));
    this.currentAddress = localStorage.getItem('currentAddress');
    this.orderService.getRestaurantsNearUser();
  }

}
