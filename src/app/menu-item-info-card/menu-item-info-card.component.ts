import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-menu-item-info-card',
  templateUrl: './menu-item-info-card.component.html',
  styleUrls: ['./menu-item-info-card.component.css']
})
export class MenuItemInfoCardComponent implements OnInit {
  @Input() menuItem: any;
  @Input() restaurantId: any;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  addToCart() {
    console.log("Called addToCart")
    this.orderService.addToCart(this.restaurantId, this.menuItem.id);
  }
}
