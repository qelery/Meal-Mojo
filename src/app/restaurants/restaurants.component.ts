import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  nearbyRestaurants: any;

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getRestaurantsNearUser().subscribe((response: any) => {
      this.nearbyRestaurants = response;
      for (let x of this.nearbyRestaurants) {
        console.log(x)
      }
    }, (err: any) => console.log(err));
  }

}
