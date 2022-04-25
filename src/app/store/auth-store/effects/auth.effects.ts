import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../../service/auth/auth.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStoreActions } from '../index';
import { AddressStoreActions } from '../../address-store';

export const LOGIN_ERROR_MSG_403 = 'Invalid username or password.';
export const REGISTER_ERROR_MSG_409 = 'An account exists with that email address.';
export const ERROR_MSG_SERVER = 'Server Error. Please try again later.';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthStoreActions.login),
      exhaustMap(({ loginRequest }: any) =>
        this.authService.login(loginRequest).pipe(
          map((loginResponse) => AuthStoreActions.loginSuccess({ loginResponse })),
          catchError((errorResp: HttpErrorResponse) => {
            const error = this.getLoginErrorMessage(errorResp);
            return of(AuthStoreActions.loginFailure({ error }));
          })
        )
      )
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthStoreActions.register),
      exhaustMap(({ registerRequest }: any) =>
        this.authService.register(registerRequest).pipe(
          map((registerResponse) =>
            AuthStoreActions.registerSuccess({ registerResponse })
          ),
          catchError((errorResp: HttpErrorResponse) => {
            const error = this.getRegisterErrorMessage(errorResp);
            return of(AuthStoreActions.registerFailure({ error }));
          })
        )
      )
    );
  });

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthStoreActions.logout),
      map(AddressStoreActions.clearAddress)
    );
  });

  getLoginErrorMessage(errorResp: HttpErrorResponse): string {
    return errorResp.status === 403 ? LOGIN_ERROR_MSG_403 : ERROR_MSG_SERVER;
  }

  getRegisterErrorMessage(errorResp: HttpErrorResponse): string {
    return errorResp.status === 409 ? REGISTER_ERROR_MSG_409 : ERROR_MSG_SERVER;
  }
}
