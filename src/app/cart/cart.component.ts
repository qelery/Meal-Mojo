import {Component, OnInit, Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import {OrderService} from "../service/order/order.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  @Output() submitOrder = new EventEmitter<any>();
  @Output() emitCoordinates = new EventEmitter<any>();
  @Output() emitTotalPrice = new EventEmitter<any>();
  restaurantName: any;
  cartItems: any;
  totalPrice: any;
  tipPercentage: any;
  restaurantCoordinates: any;
  private eventsSubscription: any;
  @Input() events: any;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = [];

    this.orderService.cartSubject.subscribe((response: any) => {
      this.cartItems = response;
      if (this.cartItems.length > 0) {
        this.orderItemsByQuantity();
        this.discoverRestaurantNameAndCoordinates();
      } else {
        this.restaurantName = 'Empty';
      }
      this.calculateTotalPrice();
      this.emitTotalPrice.next(this.totalPrice);
    });

    this.eventsSubscription = this.events.subscribe((tipPercentage: any) => {
      this.tipPercentage = tipPercentage;
      this.calculateTotalPrice()
    })
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
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
    this.totalPrice = this.totalPrice + ((this.tipPercentage/100) * this.totalPrice);
  }
}
