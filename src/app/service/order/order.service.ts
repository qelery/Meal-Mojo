import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cartItems: any;
  pastOrders: any;
  maxDistance = 13;
  cartSubject = new BehaviorSubject([]);
  pastOrdersSubject = new BehaviorSubject([]);
  constructor(private http: HttpClient) { }

  getRestaurantsNearUser(): Observable<any> {
    const long = localStorage.longitude;
    const lat = localStorage.latitude;
    console.log(localStorage.longitude);
    console.log("in get restaurants");
    return this.http.get(`${environment.restApiUrl}/api/order/restaurants?` +
      `longitude=${long.toString()}` +
      `&latitude=${lat.toString()}` +
      `&maxDistance=${this.maxDistance}`);
  }

  getRestaurantData(restaurantId: number): Observable<any> {
    return this.http.get(`${environment.restApiUrl}/api/order/restaurants/${restaurantId}`);
  }

  addToCart(restaurantId: number, menuItemId: number) {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    this.cartItems = this.http.post(`${environment.restApiUrl}/api/order/restaurants/${restaurantId}/menuitems/${menuItemId}/orderlines/1`, null,  requestOptions)
      .subscribe(response =>  this.getCartItems());

    return this.cartItems;
  }

  getCartItems() {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    return this.http.get(`${environment.restApiUrl}/api/order/cart`, requestOptions).subscribe((data: any) =>{
      this.cartItems = data;
      this.cartSubject.next(this.cartItems);
    });
  }

  removeFromCart(restaurantId: number, menuItemId: number) {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    this.cartItems = this.http.delete(`${environment.restApiUrl}/api/order/restaurants/${restaurantId}/menuitems/${menuItemId}/orderlines`, requestOptions)
      .subscribe(response => {
        console.log("the subject"); this.getCartItems();});
  }

  submitOrder(checkoutOptions: any) {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    this.http.post(`${environment.restApiUrl}/api/order/cart/checkout`, checkoutOptions, requestOptions)
      .subscribe(response => {
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
        this.getPastOrders();
      });
  }

  getPastOrders() {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    return this.http.get(`${environment.restApiUrl}/api/order/past`, requestOptions).subscribe((data: any) =>{
      this.pastOrders = data;
      this.pastOrdersSubject.next(this.pastOrders);
    });
  }

  clearCart() {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    return this.http.delete(`${environment.restApiUrl}/api/order/cart/clear`, requestOptions).subscribe((data: any) => data);
  }
}
