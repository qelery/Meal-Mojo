import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../service/order/order.service";
import {Router} from "@angular/router";
import {LocationService} from "../service/location/location.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: any;
  imageUrl: any;
  iconMarker: any;
  public deliveryMethod = 'delivery';
  public paymentMethod = 'card';
  public utensils = 'utensilsYes';
  public tip = '0';
  restaurantCoordinates: any;
  customerCoordinates: any;
  constructor(private orderService: OrderService, private router: Router, private locationService: LocationService) {
    this.imageUrl = "https://www.escoffier.edu/wp-content/uploads/2021/05/Smiling-female-Barista-with-glasses-Serves-Order-to-a-Food-Delivery-Courier-Picking-Up-Paper-Bag-with-Pastries-from-a-Cafe-Restaurant.jpeg";
    this.iconMarker = 'assets/image/food-icon-70.png'
  }

  ngOnInit(): void {
    this.orderService.getCartItems();
    this.customerCoordinates = this.locationService.getUserCurrentAddress();
  }

  submitOrder() {
    const checkoutOptions = {deliveryMethod: this.deliveryMethod, paymentMethod: this.paymentMethod, tip: this.tip}
    this.orderService.submitOrder(checkoutOptions);
    this.router.navigate(['/orders']);
  }

  coordinatesReceived(coordinates: any) {
    this.restaurantCoordinates = coordinates;
  }



}

export class AppComponent {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
}
