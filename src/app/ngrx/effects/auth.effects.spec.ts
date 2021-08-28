import { AuthEffects } from './auth.effects';
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
import { TokenStorageService } from '../../service/token-storage/token-storage.service';
import { User } from '../../shared/model';

describe('AuthEffects', () => {
  let authEffects: AuthEffects;
  let actions$ = new Observable<Action>();
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let tokenServiceSpy: jasmine.SpyObj<TokenStorageService>;

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
    const tokenSpy = jasmine.createSpyObj('TokenService', [
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
          provide: TokenStorageService,
          useValue: tokenSpy,
        },
      ],
    });

    authEffects = TestBed.inject(AuthEffects);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    tokenServiceSpy = TestBed.inject(
      TokenStorageService
    ) as jasmine.SpyObj<TokenStorageService>;
  });

  describe('on loginUser$', () => {
    describe('should fire successfully', () => {
      it('and dispatch a success action', (done) => {
        authServiceSpy.login.and.returnValue(of(mockLoginResponse));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(loginUserSuccess({ loginResponse: mockLoginResponse }));
          expect(authServiceSpy.login).toHaveBeenCalledWith(mockLoginRequest);
          done();
        });
      });

      it('and call TokenStorageService to update token and user info', () => {
        authServiceSpy.login.and.returnValue(of(mockLoginResponse));
        actions$ = of(loginUserSuccess({ loginResponse: mockLoginResponse }));

        authEffects.loginUserSuccess$.subscribe();

        expect(tokenServiceSpy.saveToken).toHaveBeenCalledWith(mockLoginResponse.token);
        expect(tokenServiceSpy.saveUser).toHaveBeenCalledWith(mockLoginResponse.userInfo);
      });
    });

    describe('should fire unsuccessfully', () => {
      it('and dispatch a failure action with the error status code', (done) => {
        const errorResp = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 403,
        });
        const expectedErrorStatus = errorResp.status;
        authServiceSpy.login.and.returnValue(throwError(errorResp));
        actions$ = of(loginUser({ loginRequest: mockLoginRequest }));

        authEffects.loginUser$.subscribe((action) => {
          expect(action).toEqual(
            loginUserFailure({ errorStatus: expectedErrorStatus })
          );
          expect(authServiceSpy.login).toHaveBeenCalledWith(mockLoginRequest);
          done();
        });
      });
    });
  });
});
