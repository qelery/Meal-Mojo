import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() restaurantName: any;
  @Input() restaurantId: any;
  cartItems: any;
  cartTotal: any;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartItems = [];

    this.orderService.getCartItems()
      .subscribe((data: any) => {
        this.cartItems = (data) ? data.slice() : [];
        console.log(this.cartItems[0].priceEach)
        this.cartTotal = this.cartItems.reduce(
          (total: number, item: any) => {
            return total + (item.quantity * item.priceEach);
          },0);
      });
  }

  removeFromCart(menuItemId: number) {
    this.orderService.removeFromCart(this.restaurantId, menuItemId);
  }
}
