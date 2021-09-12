import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { HttpMethod } from '../http-request/helpers/http-methods.helper';

import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../ngrx/reducers/auth.reducer';

const { POST } = HttpMethod;

// TODO: refresh jwt token?
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpRequestService: HttpRequestService) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpRequestService.perform(
      POST,
      '/api/users/login',
      loginRequest
    );
  }

  register(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.httpRequestService.perform(
      POST,
      '/api/users/register',
      registerRequest
    );
  }
}
