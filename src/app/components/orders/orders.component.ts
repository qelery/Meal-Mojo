import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  heroImageUrl: string;
  pastOrders: any[] | null;
  constructor(private orderService: OrderService) {
    this.heroImageUrl = '/assets/image/past-order-hero.jpeg';
  }

  ngOnInit(): void {
    this.orderService.pastOrdersSubject.subscribe((response: any) => {
      this.pastOrders = response;
    });
    this.orderService.getPastOrders();
  }
}
