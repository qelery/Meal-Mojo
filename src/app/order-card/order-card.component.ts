import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() pastOrder: any;
  restaurantName: string;
  time: string;
  totalPrice: number;
  menuItemsInfo: any;
  constructor() {}

  ngOnInit(): void {
    const then = new Date(this.pastOrder.dateTime);
    this.time = new Date(this.pastOrder.dateTime).setHours(then.getHours() - 5).toString();
    this.restaurantName = this.pastOrder.orderLines[0].restaurantName;

    this.totalPrice = this.calculateTotalPrice();
    this.menuItemsInfo = this.createInfo();

  }

  private calculateTotalPrice() {
    return this.pastOrder.orderLines
      .reduce((total: any, orderLineItem: any) => (total + orderLineItem.quantity * orderLineItem.priceEach),
      0);
  }

  private createInfo() {
    return this.pastOrder.orderLines.map((orderLine: any) => {
      return {
        name: orderLine.menuItem.name,
        quantity: orderLine.quantity
        }
    })
  }
}
