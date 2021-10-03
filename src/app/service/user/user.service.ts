import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUserInfo(updatedUser: User): Observable<User> {
    return this.http.patch<User>(
      `${environment.restApiUrl}/api/users`,
      updatedUser
    );
  }

  // TODO: Determine if the other 'done' s in the code are needed

  registerUser(user: User): Observable<any> {
    return null;
    // return this.http
    //   .post(`${environment.restApiUrl}/auth/users/register/customer`, user);
  }

  //   logoutUser(): void {
  //     this.orderService.clearCart();
  //     localStorage.removeItem('currentUser');
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('currentAddress');
  //     localStorage.removeItem('latitude');
  //     localStorage.removeItem('longitude');
  //     this.currentUser = '';
  //     this.locationService.formattedAddressSubject.next(null);
  //     this.searchSubject.next(this.currentUser);
  //     console.log('Logging out!!');
  //     this.router
  //       .navigate([''])
  //       .then((res) => this.searchSubject.next(this.currentUser));
  //   }
  //
  //   setCurrentUser(email: string) {
  //     this.currentUser = email;
  //     this.searchSubject.next(this.currentUser);
  //   }
}
