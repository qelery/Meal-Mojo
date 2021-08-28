import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {Router} from "@angular/router";
import {LocationService} from "../../service/location/location.service";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: any;
  heroImageUrl: string;
  iconMarkerImage: string;
  tipTenPercent = 0;
  tipTwentyPercent = 0;
  tipSubject = new BehaviorSubject(0);
  public deliveryMethod = 'delivery';
  public paymentMethod = 'card';
  public utensils = 'utensilsYes';
  public tip = '0';
  restaurantCoordinates: any;
  customerCoordinates: any;
  constructor(private orderService: OrderService, private router: Router, private locationService: LocationService) {
    this.heroImageUrl = "assets/image/checkout-hero-image.jpeg";
    this.iconMarkerImage = 'assets/image/food-icon-70.png';
  }

  ngOnInit(): void {
    this.orderService.getCartItems();
    this.customerCoordinates = this.locationService.getUserCurrentAddress();
  }

  submitOrder() {
    const checkoutOptions = {deliveryMethod: this.deliveryMethod, paymentMethod: this.paymentMethod, tip: this.tip};
    this.orderService.submitOrder(checkoutOptions);
    this.router.navigate(['/orders']);
  }

  coordinatesReceived(coordinates: any) {
    this.restaurantCoordinates = coordinates;
  }

  emitRecalculateTip() {
    this.tipSubject.next(+this.tip);
  }

  updateTipAmounts(totalPrice: number) {
    this.tipTenPercent = 0.1 * totalPrice;
    this.tipTwentyPercent = 0.2 * totalPrice;
  }
}
