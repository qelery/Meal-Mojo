import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {OrderService} from "../service/order/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() submitOrder = new EventEmitter<any>();
  @Output() emitCoordinates = new EventEmitter<any>();
  restaurantName: any;
  cartItems: any;
  totalPrice: any;
  restaurantCoordinates: any;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = [];

    this.orderService.searchSubject.subscribe((response: any) => {
      this.cartItems = response;
      console.log(this.cartItems)
      if (this.cartItems.length > 0) {
        this.orderItemsByQuantity();
        this.discoverRestaurantNameAndCoordinates();
      } else {
        this.restaurantName = 'Empty';
      }
      this.calculateTotalPrice();
      console.log(this.cartItems)
    });
  }


  removeFromCart(menuItemId: number) {
    const restaurantId = this.cartItems[0].menuItem.restaurantId;
    this.orderService.removeFromCart(restaurantId, menuItemId);
  }

  checkout(event: any) {
    if (event.view.location.pathname === '/checkout') {
      this.submitOrder.emit();
    } else {
      this.router.navigate(['/checkout']);
    }
  }

  discoverRestaurantNameAndCoordinates() {
      const restaurantId = this.cartItems[0].menuItem.restaurantId;
      this.orderService.getRestaurantData(restaurantId)
        .subscribe((data: any) => {
          console.log(data)
          this.restaurantCoordinates = [data.address.latitude, data.address.longitude];
          this.restaurantName = data.businessName;
          this.emitCoordinates.next(this.restaurantCoordinates);
        });

  }

  private orderItemsByQuantity() {
    this.cartItems = this.cartItems.sort((a: any, b: any) => b.quantity - a.quantity);
  }

  private calculateTotalPrice() {
    if (this.cartItems.length === 0) {
      this.totalPrice = 0;
    }
    this.totalPrice = this.cartItems.reduce(

      (total: any, orderLineItem: any) => (total + orderLineItem.quantity * orderLineItem.priceEach),
      0);
    console.log(this.totalPrice)
  }
}
