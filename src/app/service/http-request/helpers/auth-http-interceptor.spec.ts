import { inject, TestBed } from '@angular/core/testing';
import { AuthHttpInterceptor } from './auth-http-interceptor.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../local-storage/local-storage.service';

describe('AuthHttpInterceptor', () => {
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
  let mockHttpController: HttpTestingController;

  beforeEach(() => {
    const localStorageServiceSpy = jasmine.createSpyObj('TokenStorageService', [
      'getToken',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
      ],
    });
    mockLocalStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    mockHttpController = TestBed.inject(HttpTestingController);
  });

  it('should add Authorization headers to request if token exists in local storage', inject(
    [HttpClient],
    (http: HttpClient) => {
      mockLocalStorageService.getToken.and.returnValue('123abc');
      http.get('/api/1').subscribe();

      const httpRequest: TestRequest = mockHttpController.expectOne('/api/1');
      expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer 123abc');
    }
  ));

  it('should not add Authorization headers to request if token does not exist in local storage', inject(
    [HttpClient],
    (http: HttpClient) => {
      mockLocalStorageService.getToken.and.returnValue(undefined);
      http.get('/api/1').subscribe();

      const httpRequest: TestRequest = mockHttpController.expectOne('/api/1');
      expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
    }
  ));
});
