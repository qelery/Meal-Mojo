import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../../ngrx/reducers/auth.reducer';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
