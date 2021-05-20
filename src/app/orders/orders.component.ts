import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  heroImageUrl: any;
  pastOrders: any;
  constructor(private orderService: OrderService) {
    this.heroImageUrl = `https://qph.fs.quoracdn.net/main-qimg-1ed2dfc9abd325a778ffb4c71e2cfa21`;
  }

  ngOnInit(): void {
    this.orderService.pastOrdersSubject.subscribe((response: any) => {
      this.pastOrders = response;
    });
    this.orderService.getPastOrders();
  }
}
