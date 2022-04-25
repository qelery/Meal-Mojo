import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../service/order/order.service';
import { MenuItem } from '@shared/model';

@Component({
  selector: 'app-menu-item-info-card',
  templateUrl: './menu-item-info-card.component.html',
  styleUrls: ['./menu-item-info-card.component.css'],
})
export class MenuItemInfoCardComponent {
  @Input() menuItem: MenuItem;
  @Input() restaurantId: any;
  constructor(private orderService: OrderService) {}

  addToCart() {
    if (!localStorage.getItem('token')) {
      this.promptUserToLogin();
    }
    this.orderService.addToCart(this.restaurantId, this.menuItem.id);
  }

  promptUserToLogin() {
    const loginCardElement = document.querySelector('#login') as HTMLElement;
    loginCardElement.click();
  }
}
