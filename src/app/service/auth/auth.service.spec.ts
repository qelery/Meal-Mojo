import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpRequestService } from '../http-request/http-request.service';
import { HttpMethod } from '../http-request/helpers/http-methods.helper';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Role } from '../../shared/model';

describe('AuthServiceService', () => {
  let service: AuthService;
  let mockHttpRequestService: jasmine.SpyObj<HttpRequestService>;

  beforeEach(() => {
    mockHttpRequestService = jasmine.createSpyObj('HttpRequestService', ['perform']);

    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [
          { provide: HttpRequestService, useValue: mockHttpRequestService },
        ]
      });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use the http service to login user', () => {
    const loginRequest = { username: '', password: '' };

    service.login(loginRequest);

    expect(mockHttpRequestService.perform).toHaveBeenCalledWith(
      HttpMethod.POST,
      '/api/users/login',
      loginRequest
    );
  });

  it('should use the http service to register user', () => {
    const userRegistrationRequest = {
      email: 'john@example.com',
      password: 'password',
      role: Role.CUSTOMER,
      firstName: 'john',
      lastName: 'smith',
    };

    service.register(userRegistrationRequest);

    expect(mockHttpRequestService.perform).toHaveBeenCalledWith(
      HttpMethod.POST,
      '/api/users/register',
      userRegistrationRequest
    );
  });
});
