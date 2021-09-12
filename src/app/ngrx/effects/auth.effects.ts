import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AuthActionTypes,
  loginUserFailure,
  loginUserSuccess,
  registerUserFailure,
  registerUserSuccess,
} from '../actions/auth.action';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../service/auth/auth.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';

export const LOGIN_ERROR_MSG_403 = 'Invalid username or password.';
export const REGISTER_ERROR_MSG_409 =
  'An account exists with that email address.';
export const ERROR_MSG_SERVER = 'Server Error. Please try again later.';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly localStorage: LocalStorageService
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_USER),
      exhaustMap(({ loginRequest }: any) =>
        this.authService.login(loginRequest).pipe(
          map((loginResponse) => loginUserSuccess({ loginResponse })),
          catchError((errorResp: HttpErrorResponse) => {
            const error = this.getLoginErrorMessage(errorResp);
            return of(loginUserFailure({ error }));
          })
        )
      )
    );
  });

  loginUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_USER_SUCCESS),
        map(({ loginResponse }: any) => {
          this.localStorage.saveToken(loginResponse.token);
          this.localStorage.saveUser(loginResponse.userInfo);
        })
      );
    },
    { dispatch: false }
  );

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER_USER),
      exhaustMap(({ registerRequest }: any) =>
        this.authService.register(registerRequest).pipe(
          map((registerResponse) => registerUserSuccess({ registerResponse })),
          catchError((errorResp: HttpErrorResponse) => {
            const error = this.getRegisterErrorMessage(errorResp);
            return of(registerUserFailure({ error }));
          })
        )
      )
    );
  });

  registerUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActionTypes.REGISTER_USER_SUCCESS),
        map(({ registerResponse }: any) => {
          this.localStorage.saveToken(registerResponse.token);
          this.localStorage.saveUser(registerResponse.userInfo);
        })
      );
    },
    { dispatch: false }
  );

  getLoginErrorMessage(errorResp: HttpErrorResponse): string {
    return errorResp.status === 403 ? LOGIN_ERROR_MSG_403 : ERROR_MSG_SERVER;
  }

  getRegisterErrorMessage(errorResp: HttpErrorResponse): string {
    return errorResp.status === 409 ? REGISTER_ERROR_MSG_409 : ERROR_MSG_SERVER;
  }
}
