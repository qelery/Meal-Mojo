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

  loginUser(user: User): void {
    this.http
      .post(`${environment.apiUrl}/auth/users/login`, user)
      .subscribe((response: any) => {
        const token = response.jwt;
        localStorage.setItem('currentUser', `${user.email}`);
        localStorage.setItem('token', `${token}`);
        console.log(response, token);
        this.currentUser = user.email;
        this.searchSubject.next(this.currentUser);
      }, err => console.log(err))
  }

  registerUser(user: User): Observable<any> {
  //   let emailExistsFlag = true;
  //   this.http
  //     .post(`${environment.apiUrl}/auth/users/register/customer`, user)
  //     .subscribe(()=> {
  //       emailExistsFlag = false;
  //     }, err => {
  //       if (err.status === 409) {
  //         console.log("User already exists with that email!!");
  //         emailExistsFlag = true;
  //       }
  //     });
  //   console.log(emailExistsFlag);
  //   return emailExistsFlag;
  // }
    return this.http
      .post(`${environment.apiUrl}/auth/users/register/customer`, user);
  }
}

export interface User {
  email: string,
  password: string
}
