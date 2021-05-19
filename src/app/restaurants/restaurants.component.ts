import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order/order.service";
import {LocationService} from "../service/location/location.service";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  nearbyRestaurants: any;
  currentAddress: string | null = '' ;

  constructor(public orderService: OrderService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.orderService.getRestaurantsNearUser().subscribe((response: any) => {
      this.nearbyRestaurants = response;
      for (let x of this.nearbyRestaurants) {
        console.log(x)
      }
    }, (err: any) => console.log(err));
    this.currentAddress = localStorage.getItem('currentAddress');
  }

}
