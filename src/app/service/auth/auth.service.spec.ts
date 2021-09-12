import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpRequestService } from '../http-request/http-request.service';
import { HttpMethod } from '../http-request/helpers/http-methods.helper';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Role } from '../../shared/model';
import { LoginRequest, RegisterRequest } from '../../ngrx/reducers/auth.reducer';

describe('AuthServiceService', () => {
  let service: AuthService;
  let mockHttpRequestService: jasmine.SpyObj<HttpRequestService>;

  beforeEach(() => {
    mockHttpRequestService = jasmine.createSpyObj('HttpRequestService', [
      'perform',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpRequestService, useValue: mockHttpRequestService },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use the http service to login user', () => {
    const loginRequest: LoginRequest = { username: '', password: '' };

    service.login(loginRequest);

    expect(mockHttpRequestService.perform).toHaveBeenCalledWith(
      HttpMethod.POST,
      '/api/users/login',
      loginRequest
    );
  });

  it('should use the http service to register user', () => {
    const registrationRequest: RegisterRequest = {
      email: 'john@example.com',
      password: 'password',
      role: Role.CUSTOMER,
      firstName: 'john',
      lastName: 'smith',
    };

    service.register(registrationRequest);

    expect(mockHttpRequestService.perform).toHaveBeenCalledWith(
      HttpMethod.POST,
      '/api/users/register',
      registrationRequest
    );
  });
});
