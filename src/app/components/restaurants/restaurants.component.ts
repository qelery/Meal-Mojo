import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  nearbyRestaurants: any[] | null;
  currentAddress: string | null ;
  heroImageUrl: string;
  private geoCoder;
  constructor(public orderService: OrderService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.heroImageUrl = "assets/image/store-front-hero-image.jpg";
  }

  @ViewChild('search')
  public searchElementRef: ElementRef;

  ngOnInit(): void {
    this.orderService.getRestaurantsNearUser().subscribe((response: any) => {
      this.nearbyRestaurants = response;
      for (let x of this.nearbyRestaurants) {
        console.log(x);
      }
    }, (err: any) => console.log(err));
    this.currentAddress = localStorage.getItem('currentAddress');
    this.orderService.getRestaurantsNearUser();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.geoCoder = new google.maps.Geocoder;
      //
      // const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     //get the place result
      //     const place = autocomplete.getPlace();
      //
      //     //verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }
      //
      //     //set latitude, longitude and zoom
      //     // this.lat = place.geometry.location.lat();
      //     // this.lng = place.geometry.location.lng();
      //     // this.zoom = 12;
      //   });
      // });
    });
  }

}
