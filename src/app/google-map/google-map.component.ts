import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from "../service/location/location.service";
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  // @ViewChild('map') mapElement: any;
  // map: any;
  merchantIconMarker: any;
  latitudeCustomer: any;
  longitudeCustomer: any;
  latitudeMerchant: any;
  longitudeMerchant: any;
  agmFitBoundsCustomer = true;
  agmFitBoundsMerchant = true;
  fitBounds = true;
  constructor(private locationService: LocationService, private orderService: OrderService) {
    this.merchantIconMarker = 'assets/image/food-icon-70.png'
  }

  ngOnInit(): void {
    [this.latitudeCustomer, this.longitudeCustomer] = this.locationService.getUserCurrentAddress();

    let cartItems = [];

    // this.orderService.searchSubject.subscribe((response: any) => {
    //   cartItems = response;
    //   console.log("Cart response")
    //   console.log(response)
    //   console.log("Cart response")
    //   if (cartItems.length > 0) {
    //     return;
    //   }
    //   const restaurantId = cartItems[0].menuItem.restaurantId;
    //   this.orderService.getRestaurantData(restaurantId);
    //   // [this.latitudeMerchant, this.longitudeMerchant] = this.locationService.getMerchantAddress();
    //   [this.latitudeCustomer, this.longitudeCustomer] = this.locationService.getUserCurrentAddress();
    // });
    // this.orderService.getCartItems();
    // console.log(this.longitudeMerchant)
  }

}
