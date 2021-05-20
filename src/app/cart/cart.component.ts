import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {OrderService} from "../service/order/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() restaurantName: any;
  @Input() restaurantId: any;
  @Output() submitOrder = new EventEmitter<any>();
  cartItems: any;
  cartTotal: any;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = [];

    this.orderService.getCartItems()
      .subscribe((data: any) => {
        this.cartItems = (data) ? data.slice() : [];
        console.log(this.cartItems[0])
        this.cartTotal = this.cartItems.reduce(
          (total: number, item: any) => {
            return total + (item.quantity * item.priceEach);
          },0);

        if (this.cartItems.length > 0 && !this.restaurantName) {
          this.orderService.getRestaurantData(this.cartItems[0].menuItem.restaurantId)
            .subscribe((data: any) => {
              this.restaurantName = data.businessName;
            })
        }
      });

  }

  removeFromCart(menuItemId: number) {
    this.orderService.removeFromCart(this.restaurantId, menuItemId);
  }

  checkout(event: any) {
    if (event.view.location.pathname === '/checkout') {
      this.submitOrder.emit();
    } else {
      console.log("HERE!!!")
      this.router.navigate(['/checkout']);
    }
  }
}
