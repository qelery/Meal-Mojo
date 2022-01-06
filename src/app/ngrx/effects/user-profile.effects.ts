import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';
import { UserService } from '../../service/user/user.service';
import {
  updateUserAddressFailure,
  updateUserAddressSuccess,
  UserProfileActionTypes,
} from '../actions/user-profile.action';

export const ERROR_MSG_SERVER = 'Server Error. Please try again later.';

@Injectable()
export class UserProfileEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  updateUserAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserProfileActionTypes.UPDATE_USER_ADDRESS),
      exhaustMap(({ address }: any) =>
        this.userService.updateUserAddress(address).pipe(
          map((updatedUserInfo) => updateUserAddressSuccess({ updatedUserInfo })),
          catchError(() => {
            return of(updateUserAddressFailure({ error: ERROR_MSG_SERVER }));
          }),
        ),
      ),
    );
  });

  updateUserAddressSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserProfileActionTypes.UPDATE_USER_ADDRESS_SUCCESS),
        map(({ updatedUserInfo }: any) => {
          this.localStorageService.saveAddress(updatedUserInfo.address);
          this.localStorageService.saveUser(updatedUserInfo);
        }),
      );
    },
    { dispatch: false },
  );
}
