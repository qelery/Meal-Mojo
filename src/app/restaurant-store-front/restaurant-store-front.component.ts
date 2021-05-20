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
  generalAddress: any;
  restaurantName: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    /*    this.route.paramMap
          .subscribe(params => {
            this.restaurantId = params.get('id');
            this.orderService.getRestaurantData(this.restaurantId).subscribe(response => {
              this.restaurant = response;
              this.menuItems = response.menuItems;
              console.log(this.restaurant);
            })
          })*/
    this.route.paramMap
      .subscribe(params => {
        this.restaurantId = params.get('id');
        this.orderService.getRestaurantData(this.restaurantId).subscribe((response: any) => {
          this.restaurant = response;
          this.menuItems = response.menuItems;
          this.restaurantName = response.businessName;
          const address = response.address;
          this.generalAddress = `${address.street1}, ${address.city}`
          console.log(this.restaurant)
        }, (err: any) => console.log(err));
        // this.currentAddress = localStorage.getItem('currentAddress');
      });
  }
}
