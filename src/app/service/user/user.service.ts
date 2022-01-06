import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, User } from '../../shared/model';
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

  updateUserAddress(address: Address): Observable<User> {
    return this.http.patch<User>(
      `${environment.restApiUrl}/api/users/address`,
      address
    );
  }

}
