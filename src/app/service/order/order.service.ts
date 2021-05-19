import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LocationService} from "../location/location.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  nearestRestaurants: any;
  maxDistance = 15; // miles

  constructor(private http: HttpClient, private locationService: LocationService) { }

  getRestaurantsNearUser() {
    const long = this.locationService.currentAddress.longitude;
    const lat = this.locationService.currentAddress.latitude;
    this.nearestRestaurants = this.http.get(`${environment.restApiUrl}/api/order/restaurants?` +
      `longitude=${long}` +
      `&latitude=${lat}` +
      `&maxDistance=${this.maxDistance}`).subscribe(result => console.log(result));
    return this.nearestRestaurants;
  }
}
