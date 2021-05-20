import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {Router} from "@angular/router";
import {LocationService} from "../location/location.service";
import {OrderService} from "../order/order.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser!: string;
  searchSubject = new BehaviorSubject('');

  constructor(private  http: HttpClient, private router: Router,
              private locationService: LocationService, private orderService: OrderService) { }

  loginUser(user: User): Observable<any> {
    return this.http.post(`${environment.restApiUrl}/auth/users/login`, user);
  }

  registerUser(user: User): Observable<any> {
    return this.http
      .post(`${environment.restApiUrl}/auth/users/register/customer`, user);
  }

  logoutUser(): void {
    this.orderService.clearCart();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('currentAddress');
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    this.currentUser = '';
    this.locationService.searchSubject.next(null);
    this.searchSubject.next(this.currentUser);
    console.log("Logging out!!")
    this.router.navigate(['']).then(res => this.searchSubject.next(this.currentUser));
  }

  setCurrentUser(email: string) {
    this.currentUser = email;
    this.searchSubject.next(this.currentUser);
  }
}

export interface User {
  email: string,
  password: string
}
