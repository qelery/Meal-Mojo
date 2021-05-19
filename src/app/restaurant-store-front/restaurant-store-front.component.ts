import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-restaurant-store-front',
  templateUrl: './restaurant-store-front.component.html',
  styleUrls: ['./restaurant-store-front.component.css']
})
export class RestaurantStoreFrontComponent implements OnInit {
  restaurantId: any;
  restaurant: any;
  menuItems: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.restaurantId = params.get('id');
        this.orderService.getRestaurantData(this.restaurantId).subscribe(response => {
          this.restaurant = response;
          this.menuItems = response.menuItems;
          console.log(this.restaurant);
        })
      })
  }

}
