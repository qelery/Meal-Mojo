import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  imageUrl: any;
  public deliveryMethod: any;
  public paymentMethod: any;
  public utensils: any;
  public tip: any;
  constructor(private orderService: OrderService) {
    this.imageUrl = "https://www.escoffier.edu/wp-content/uploads/2021/05/Smiling-female-Barista-with-glasses-Serves-Order-to-a-Food-Delivery-Courier-Picking-Up-Paper-Bag-with-Pastries-from-a-Cafe-Restaurant.jpeg";
  }

  ngOnInit(): void {
  }

  submitOrder() {
    const checkoutOptions = {deliveryMethod: this.deliveryMethod, paymentMethod: this.paymentMethod, tip: this.tip}
    this.orderService.submitOrder(checkoutOptions);
  }
}
