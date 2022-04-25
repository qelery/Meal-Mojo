// import { Injectable } from '@angular/core';
//
// import { Observable } from 'rxjs';
// import {
//   LoginRequest,
//   LoginResponse,
//   RegisterRequest,
// } from '../../store/reducers/auth.reducer';
// import { environment } from '@env';
// import { HttpClient } from '@angular/common/http';
//
// // TODO: refresh jwt token?
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private readonly http: HttpClient) {}
//
//   login(loginRequest: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(
//       `${environment.restApiUrl}/api/users/login`,
//       loginRequest
//     );
//   }
//
//   register(registerRequest: RegisterRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(
//       `${environment.restApiUrl}/api/users/register`,
//       registerRequest
//     );
//   }
// }

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../shared/model';

// TODO: refresh jwt token?
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.restApiUrl}/api/users/login`,
      loginRequest
    );
  }

  register(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.restApiUrl}/api/users/register`,
      registerRequest
    );
  }
}
