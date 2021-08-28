import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AuthActionTypes,
  loginUserFailure,
  loginUserSuccess,
} from '../actions/auth.action';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../service/auth/auth.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../../service/token-storage/token-storage.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly tokenStorage: TokenStorageService
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_USER),
      exhaustMap(({ loginRequest }: any) =>
        this.authService.login(loginRequest).pipe(
          map((loginResponse) => loginUserSuccess({ loginResponse })),
          catchError((error: HttpErrorResponse) => {
            return of(loginUserFailure({ errorStatus: error.status }));
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
          this.tokenStorage.saveToken(loginResponse.token);
          this.tokenStorage.saveUser(loginResponse.userInfo);
        })
      );
    },
    { dispatch: false }
  );
}
