import { inject, TestBed } from '@angular/core/testing';
import { AuthHttpInterceptor } from './auth-http-interceptor.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';

describe('AuthHttpInterceptor', () => {
  let mockTokenService: jasmine.SpyObj<TokenService>;
  let mockHttpController: HttpTestingController;

  beforeEach(() => {
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
        {
          provide: TokenService,
          useValue: tokenServiceSpy,
        },
      ],
    });
    mockTokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    mockHttpController = TestBed.inject(HttpTestingController);
  });

  it('should add Content-Type application/json header to request', inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/api/1').subscribe();

      const httpRequest: TestRequest = mockHttpController.expectOne('/api/1');
      expect(httpRequest.request.headers.get('Content-Type')).toEqual('application/json');
    }
  ));

  it('should add Authorization header to request if token exists in local storage', inject(
    [HttpClient],
    (http: HttpClient) => {
      mockTokenService.getToken.and.returnValue('123abc');
      http.get('/api/1').subscribe();

      const httpRequest: TestRequest = mockHttpController.expectOne('/api/1');
      expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer 123abc');
    }
  ));

  it('should not add Authorization header to request if token does not exist in local storage', inject(
    [HttpClient],
    (http: HttpClient) => {
      mockTokenService.getToken.and.returnValue(undefined);
      http.get('/api/1').subscribe();

      const httpRequest: TestRequest = mockHttpController.expectOne('/api/1');
      expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
    }
  ));
});
