import { AuthEffects, LOGIN_ERROR_MSG_403, LOGIN_ERROR_MSG_SERVER } from './auth.effects';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  loginUser,
  loginUserFailure,
  loginUserSuccess,
} from '../actions/auth.action';
import { LoginRequest, LoginResponse } from '../../service/auth/model';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';
import { User } from '../../shared/model';

describe('AuthEffects', () => {
  let authEffects: AuthEffects;
  let actions$ = new Observable<Action>();
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  const mockUser: User = {
    email: 'email@example.com',
    firstName: 'First',
    lastName: 'Last',
    address: undefined,
  };
  const mockLoginRequest: LoginRequest = {
    username: 'user',
    password: 'pass',
  };
  const mockLoginResponse: LoginResponse = {
    token: 'token',
    userInfo: mockUser,
  };

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const tokenSpy = jasmine.createSpyObj('LocalStorageService', [
      'saveToken',
      'saveUser',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: authSpy,
        },
        {
          provide: LocalStorageService,
          useValue: tokenSpy,
        },
      ],
    });

    authEffects = TestBed.inject(AuthEffects);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    localStorageServiceSpy = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  describe('on loginUser$', () => {
    describe('should fire successfully', () => {
      it('and dispatch a success action', (done) => {
        authServiceSpy.login.and.returnValue(of(mockLoginResponse));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(
            loginUserSuccess({ loginResponse: mockLoginResponse })
          );
          expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
            mockLoginRequest
          );
          done();
        });
      });

      it('and call TokenStorageService to update token and user info', () => {
        authServiceSpy.login.and.returnValue(of(mockLoginResponse));
        actions$ = of(loginUserSuccess({ loginResponse: mockLoginResponse }));

        authEffects.loginUserSuccess$.subscribe();

        expect(localStorageServiceSpy.saveToken).toHaveBeenCalledOnceWith(
          mockLoginResponse.token
        );
        expect(localStorageServiceSpy.saveUser).toHaveBeenCalledOnceWith(
          mockLoginResponse.userInfo
        );
      });
    });

    describe('should fire unsuccessfully', () => {
      it('and dispatch failure action with a canned error message for a 403 response', (done) => {
        const errorResp = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 403,
        });
        authServiceSpy.login.and.returnValue(throwError(errorResp));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(
            loginUserFailure({ error: LOGIN_ERROR_MSG_403 })
          );
          expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
            mockLoginRequest
          );
          done();
        });
      });

      it('and dispatch failure action with canned error message for a non-403 response', (done) => {
        const errorResp = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 500,
        });
        authServiceSpy.login.and.returnValue(throwError(errorResp));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(loginUserFailure({ error: LOGIN_ERROR_MSG_SERVER }));
          expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
            mockLoginRequest
          );
          done();
        });
      });
    });
  });
});
