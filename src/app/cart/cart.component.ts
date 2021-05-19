import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../service/order/order.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() restaurantName: any;
  cartItems: any;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartItems = [];


    this.orderService.getCartItems()
      .subscribe((data: any) => {
        this.cartItems = (data) ? data.slice() : [];
      });
  }

}
