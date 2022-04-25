import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../service/order/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
})
export class OrderCardComponent implements OnInit {
  @Input() pastOrder: any;
  restaurantName: string;
  time: string;
  totalPrice: number;
  menuItemsInfo: any;
  constructor() {}

  ngOnInit(): void {
    this.time = this.pastOrder.dateTime;
    this.restaurantName = this.pastOrder.orderLines[0].restaurantName;

    this.totalPrice = this.calculateTotalPrice();
    this.menuItemsInfo = this.createInfo();
  }

  private calculateTotalPrice() {
    return this.pastOrder.orderLines.reduce(
      (total: any, orderLineItem: any) =>
        total + orderLineItem.quantity * orderLineItem.priceEach,
      0
    );
  }

  private createInfo() {
    return this.pastOrder.orderLines.map((orderLine: any) => {
      return {
        name: orderLine.menuItem.name,
        quantity: orderLine.quantity,
      };
    });
  }
}
