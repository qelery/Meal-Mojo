import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { HttpMethod } from '../http-request/helpers/http-methods.helper';
import { LoginRequest, UserRegistrationRequest } from './model';
import { Observable } from 'rxjs';
import { LoginResponse } from './model';
import { User } from '../../shared/model';

const { POST } = HttpMethod;

// TODO: refresh jwt token?
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpRequestService: HttpRequestService) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse>  {
    return this.httpRequestService.perform(
      POST,
      '/api/users/login',
      loginRequest
    );
  }

  register(userCreationRequest: UserRegistrationRequest): Observable<User>  {
    return this.httpRequestService.perform(
      POST,
      '/api/users/register',
      userCreationRequest
    );
  }
}
