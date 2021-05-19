import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LocationService} from "../location/location.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  nearestRestaurants: any;
  maxDistance = 15; // miles
  searchSubject = new Subject();

  constructor(private http: HttpClient, private locationService: LocationService, private router: Router) { }

  getRestaurantsNearUser() {
    const long = localStorage.longitude;
    const lat = localStorage.latitude;
    console.log(localStorage.longitude)
    console.log("in get restaurants")
    return this.http.get(`${environment.restApiUrl}/api/order/restaurants?` +
      `longitude=${long.toString()}` +
      `&latitude=${lat.toString()}` +
      `&maxDistance=${this.maxDistance}`);
    // this.searchSubject.next(this.nearestRestaurants);
    // console.log("LOgging in order serive")
    // console.log(this.nearestRestaurants)
    //
    // return this.nearestRestaurants;
  }
}
