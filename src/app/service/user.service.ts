import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = '';
  searchSubject = new Subject();

  constructor(private  http: HttpClient) { }

  loginUser(user: User): Observable<any> {
    // this.http
    //   .post(`${environment.apiUrl}/auth/users/login`, user)
    //   .subscribe((response: any) => {
    //     const token = response.jwt;
    //     localStorage.setItem('currentUser', `${user.email}`);
    //     localStorage.setItem('token', `${token}`);
    //     console.log(response, token);
    //     this.currentUser = user.email;
    //     this.searchSubject.next(this.currentUser);
    //   }, err => console.log(err));
    return this.http.post(`${environment.apiUrl}/auth/users/login`, user);
  }

  registerUser(user: User): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/users/register/customer`, user);
  }

  setCurrentUser(email: string) {
    this.currentUser = email;
  }
}

export interface User {
  email: string,
  password: string
}
