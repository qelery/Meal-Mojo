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
  let authService: jasmine.SpyObj<AuthService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
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
          useValue: authServiceSpy,
        },
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
      ],
    });

    authEffects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    localStorageService = TestBed.inject(
      LocalStorageService,
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  describe('on loginUser$', () => {
    describe('should fire successfully', () => {
      it('and dispatch a success action', () => {
        authService.login.and.returnValue(of(mockLoginResponse));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(
            loginUserSuccess({ loginResponse: mockLoginResponse }),
          );
          expect(authService.login).toHaveBeenCalledOnceWith(
            mockLoginRequest,
          );
        });
      });

      it('and call LocalStorageService to update token and user info', () => {
        authService.login.and.returnValue(of(mockLoginResponse));
        actions$ = of(loginUserSuccess({ loginResponse: mockLoginResponse }));

        authEffects.loginUserSuccess$.subscribe();

        expect(localStorageService.saveToken).toHaveBeenCalledOnceWith(
          mockLoginResponse.token,
        );
        expect(localStorageService.saveUser).toHaveBeenCalledOnceWith(
          mockLoginResponse.userInfo,
        );
      });
    });

    describe('should fire unsuccessfully', () => {
      it('and dispatch failure action with a canned error message for a 403 response', () => {
        const errorResp = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 403,
        });
        authService.login.and.returnValue(throwError(errorResp));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(
            loginUserFailure({ error: LOGIN_ERROR_MSG_403 }),
          );
          expect(authService.login).toHaveBeenCalledOnceWith(
            mockLoginRequest,
          );
        });
      });

      it('and dispatch failure action with canned error message for a non-403 response', () => {
        const errorResp = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 500,
        });
        authService.login.and.returnValue(throwError(errorResp));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(loginUserFailure({ error: ERROR_MSG_SERVER }));
          expect(authService.login).toHaveBeenCalledOnceWith(
            mockLoginRequest,
          );
        });
      });
    });
  });

  describe('on registerUser$', () => {
    describe('should fire successfully', () => {
      it('and dispatch a success action', () => {
        authService.register.and.returnValue(of(mockLoginResponse));
        actions$ = of(registerUser({ registerRequest: mockRegisterRequest }));

        authEffects.registerUser$.subscribe((action) => {
          expect(action).toEqual(
            registerUserSuccess({ registerResponse: mockLoginResponse }),
          );
          expect(authService.register).toHaveBeenCalledWith(
            mockRegisterRequest,
          );
        });
      });

      it('and call LocalStorageService to update token and user info', () => {
        authService.register.and.returnValue(of(mockLoginResponse));
        actions$ = of(
          registerUserSuccess({ registerResponse: mockLoginResponse }),
        );

        authEffects.registerUserSuccess$.subscribe();

        expect(localStorageService.saveUser).toHaveBeenCalledOnceWith(
          mockLoginResponse.userInfo,
        );
        expect(localStorageService.saveToken).toHaveBeenCalledOnceWith(
          mockLoginResponse.token,
        );
      });
    });

    describe('should fire unsuccessfully', () => {
      it('and dispatch failure action with canned error message for a 409 response', () => {
        const errResponse = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 409,
        });
        authService.register.and.returnValue(throwError(errResponse));
        actions$ = of(registerUser({ registerRequest: mockRegisterRequest }));

        authEffects.registerUser$.subscribe((action) => {
          expect(action).toEqual(
            registerUserFailure({
              error: REGISTER_ERROR_MSG_409,
            }),
          );
          expect(authService.register).toHaveBeenCalledOnceWith(
            mockRegisterRequest,
          );
        });
      });

      it('and dispatch failure action with canned error message for non-409 response', () => {
        const errResponse = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 500,
        });
        authService.register.and.returnValue(throwError(errResponse));
        actions$ = of(registerUser({ registerRequest: mockRegisterRequest }));

        authEffects.registerUser$.subscribe((action) => {
          expect(action).toEqual(
            registerUserFailure({
              error: ERROR_MSG_SERVER,
            }),
          );
          expect(authService.register).toHaveBeenCalledOnceWith(
            mockRegisterRequest,
          );
        });
      });
    });
  });

  describe('on logoutUser$', () => {
    it('should call local LocalStorageService to clear token and user info', () => {
      actions$ = of(logoutUser());

      authEffects.logoutUser$.subscribe();

      expect(localStorageService.clear).toHaveBeenCalled();
    });
  });
});
