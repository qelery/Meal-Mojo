import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {Router} from "@angular/router";
import {LocationService} from "../location/location.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser!: string;
  searchSubject = new Subject();

  constructor(private  http: HttpClient, private router: Router, private locationService: LocationService) { }

  loginUser(user: User): Observable<any> {
    return this.http.post(`${environment.restApiUrl}/auth/users/login`, user);
  }

  registerUser(user: User): Observable<any> {
    return this.http
      .post(`${environment.restApiUrl}/auth/users/register/customer`, user);
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('currentAddress');
    this.currentUser = '';
    this.locationService.searchSubject.next(null);
    this.searchSubject.next(this.currentUser);
    this.router.navigate(['']);
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
