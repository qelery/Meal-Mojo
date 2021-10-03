import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@env';
import {
  mockLoginRequest,
  mockLoginResponse,
  mockRegisterRequest,
} from '../../test/mock-data';
import { AuthHttpInterceptor } from '../auth-http-interceptor/auth-http-interceptor.service';
import { LoginResponse } from '../../ngrx/reducers/auth.reducer';

describe('AuthServiceService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthHttpInterceptor],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should use the http service to login user', () => {
    authService.login(mockLoginRequest).subscribe((res: LoginResponse) => {
      expect(res).toEqual(mockLoginResponse);
    });

    const req = httpMock.expectOne(`${environment.restApiUrl}/api/users/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoginRequest);

    req.flush(mockLoginResponse);
  });

  it('should use the http service to register user', () => {
    authService
      .register(mockRegisterRequest)
      .subscribe((resp: LoginResponse) => {
        expect(resp).toEqual(mockLoginResponse);
      });

    const req = httpMock.expectOne(
      `${environment.restApiUrl}/api/users/register`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRegisterRequest);

    req.flush(mockLoginResponse);
  });
});
