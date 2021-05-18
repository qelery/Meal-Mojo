import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = '';
  searchSubject = new Subject();

  constructor(private  http: HttpClient, private router: Router) { }

  loginUser(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/users/login`, user);
  }

  registerUser(user: User): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/users/register/customer`, user);
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUser = '';
    this.searchSubject.next(this.currentUser);
    this.router.navigate(['/']);
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
