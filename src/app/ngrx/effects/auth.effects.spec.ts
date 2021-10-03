import {
  AuthEffects,
  ERROR_MSG_SERVER,
  LOGIN_ERROR_MSG_403,
  REGISTER_ERROR_MSG_409,
} from './auth.effects';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  logoutUser,
  registerUser,
  registerUserFailure,
  registerUserSuccess,
} from '../actions/auth.action';

import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';

import {
  mockLoginRequest,
  mockLoginResponse,
  mockRegisterRequest,
} from '../../test/mock-data';

describe('AuthEffects', () => {
  let authEffects: AuthEffects;
  let actions$ = new Observable<Action>();
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);
    const tokenSpy = jasmine.createSpyObj('LocalStorageService', [
      'saveToken',
      'saveUser',
      'clear',
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
      it('and dispatch a success action', () => {
        authServiceSpy.login.and.returnValue(of(mockLoginResponse));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(
            loginUserSuccess({ loginResponse: mockLoginResponse })
          );
          expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
            mockLoginRequest
          );
        });
      });

      it('and call LocalStorageService to update token and user info', () => {
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
      it('and dispatch failure action with a canned error message for a 403 response', () => {
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
        });
      });

      it('and dispatch failure action with canned error message for a non-403 response', () => {
        const errorResp = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 500,
        });
        authServiceSpy.login.and.returnValue(throwError(errorResp));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(loginUserFailure({ error: ERROR_MSG_SERVER }));
          expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
            mockLoginRequest
          );
        });
      });
    });
  });

  describe('on registerUser$', () => {
    describe('should fire successfully', () => {
      it('and dispatch a success action', () => {
        authServiceSpy.register.and.returnValue(of(mockLoginResponse));
        actions$ = of(registerUser({ registerRequest: mockRegisterRequest }));

        authEffects.registerUser$.subscribe((action) => {
          expect(action).toEqual(
            registerUserSuccess({ registerResponse: mockLoginResponse })
          );
          expect(authServiceSpy.register).toHaveBeenCalledWith(
            mockRegisterRequest
          );
        });
      });

      it('and call LocalStorageService to update token and user info', () => {
        authServiceSpy.register.and.returnValue(of(mockLoginResponse));
        actions$ = of(
          registerUserSuccess({ registerResponse: mockLoginResponse })
        );

        authEffects.registerUserSuccess$.subscribe();

        expect(localStorageServiceSpy.saveUser).toHaveBeenCalledOnceWith(
          mockLoginResponse.userInfo
        );
        expect(localStorageServiceSpy.saveToken).toHaveBeenCalledOnceWith(
          mockLoginResponse.token
        );
      });
    });

    describe('should fire unsuccessfully', () => {
      it('and dispatch failure action with canned error message for a 409 response', () => {
        const errResponse = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 409,
        });
        authServiceSpy.register.and.returnValue(throwError(errResponse));
        actions$ = of(registerUser({ registerRequest: mockRegisterRequest }));

        authEffects.registerUser$.subscribe((action) => {
          expect(action).toEqual(
            registerUserFailure({
              error: REGISTER_ERROR_MSG_409,
            })
          );
          expect(authServiceSpy.register).toHaveBeenCalledOnceWith(
            mockRegisterRequest
          );
        });
      });

      it('and dispatch failure action with canned error message for non-409 response', () => {
        const errResponse = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 500,
        });
        authServiceSpy.register.and.returnValue(throwError(errResponse));
        actions$ = of(registerUser({ registerRequest: mockRegisterRequest }));

        authEffects.registerUser$.subscribe((action) => {
          expect(action).toEqual(
            registerUserFailure({
              error: ERROR_MSG_SERVER,
            })
          );
          expect(authServiceSpy.register).toHaveBeenCalledOnceWith(
            mockRegisterRequest
          );
        });
      });
    });
  });

  describe('on logoutUser$', () => {
    it('should call local LocalStorageService to clear token and user info', () => {
      actions$ = of(logoutUser());

      authEffects.logoutUser$.subscribe();

      expect(localStorageServiceSpy.clear).toHaveBeenCalled();
    });
  });
});
