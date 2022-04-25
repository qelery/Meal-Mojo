import {
  AuthEffects,
  ERROR_MSG_SERVER,
  LOGIN_ERROR_MSG_403,
  REGISTER_ERROR_MSG_409,
} from './auth.effects';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  mockLoginRequest,
  mockLoginResponse,
  mockRegisterRequest,
} from '@test/mock-data';
import { AuthService } from '../../../service/auth/auth.service';
import { AuthStoreActions } from '../index';
import { AddressStoreActions } from '../../address-store';

describe('AuthEffects', () => {
  let authEffects: AuthEffects;
  let actions$ = new Observable<Action>();
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    });

    authEffects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  describe('on loginUser$', () => {
    it('should fire successfully', () => {
      authService.login.and.returnValue(of(mockLoginResponse));
      actions$ = of(AuthStoreActions.login({ loginRequest: mockLoginRequest }));

      authEffects.loginUser$.subscribe((action) => {
        expect(action).toEqual(
          AuthStoreActions.loginSuccess({ loginResponse: mockLoginResponse })
        );
        expect(authService.login).toHaveBeenCalledOnceWith(mockLoginRequest);
      });
    });

    describe('should fire unsuccessfully', () => {
      it('and dispatch failure action with a canned error message for a 403 response', () => {
        const errorResp = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 403,
        });
        authService.login.and.returnValue(throwError(() => errorResp));
        actions$ = of(AuthStoreActions.login({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(
            AuthStoreActions.loginFailure({ error: LOGIN_ERROR_MSG_403 })
          );
          expect(authService.login).toHaveBeenCalledOnceWith(mockLoginRequest);
        });
      });

      it('and dispatch failure action with canned error message for a non-403 response', () => {
        const errorResp = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 500,
        });
        authService.login.and.returnValue(throwError(() => errorResp));
        actions$ = of(AuthStoreActions.login({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(
            AuthStoreActions.loginFailure({ error: ERROR_MSG_SERVER })
          );
          expect(authService.login).toHaveBeenCalledOnceWith(mockLoginRequest);
        });
      });
    });
  });

  describe('on registerUser$', () => {
    it('should fire successfully', () => {
      authService.register.and.returnValue(of(mockLoginResponse));
      actions$ = of(AuthStoreActions.register({ registerRequest: mockRegisterRequest }));

      authEffects.registerUser$.subscribe((action) => {
        expect(action).toEqual(
          AuthStoreActions.registerSuccess({ registerResponse: mockLoginResponse })
        );
        expect(authService.register).toHaveBeenCalledWith(mockRegisterRequest);
      });
    });

    describe('should fire unsuccessfully', () => {
      it('and dispatch failure action with canned error message for a 409 response', () => {
        const errResponse = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 409,
        });
        authService.register.and.returnValue(throwError(() => errResponse));
        actions$ = of(
          AuthStoreActions.register({ registerRequest: mockRegisterRequest })
        );

        authEffects.registerUser$.subscribe((action) => {
          expect(action).toEqual(
            AuthStoreActions.registerFailure({
              error: REGISTER_ERROR_MSG_409,
            })
          );
          expect(authService.register).toHaveBeenCalledOnceWith(mockRegisterRequest);
        });
      });

      it('and dispatch failure action with canned error message for non-409 response', () => {
        const errResponse = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 500,
        });
        authService.register.and.returnValue(throwError(() => errResponse));
        actions$ = of(
          AuthStoreActions.register({ registerRequest: mockRegisterRequest })
        );

        authEffects.registerUser$.subscribe((action) => {
          expect(action).toEqual(
            AuthStoreActions.registerFailure({
              error: ERROR_MSG_SERVER,
            })
          );
          expect(authService.register).toHaveBeenCalledOnceWith(mockRegisterRequest);
        });
      });
    });
  });

  describe('on logoutUser$', () => {
    it('should call action to clear address from state', () => {
      actions$ = of(AuthStoreActions.logout());

      authEffects.logoutUser$.subscribe((actions) => {
        expect(actions).toEqual(AddressStoreActions.clearAddress());
      });
    });
  });
});
