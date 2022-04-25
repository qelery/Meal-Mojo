import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from '../../../service/user/user.service';
import { selectUserIsLoggedIn } from '../../auth-store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { AddressStoreActions } from '../index';

export const ERROR_MSG_SERVER = 'Server Error. Please try again later.';

@Injectable()
export class AddressEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly store: Store
  ) {}

  getUserAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressStoreActions.getUserAddress),
      mergeMap(({ address }: any) =>
        this.checkIfUserLoggedIn().pipe(
          map((userIsLoggedIn) => [address, userIsLoggedIn])
        )
      ),
      mergeMap(([address, userIsLoggedIn]) => {
        if (userIsLoggedIn) {
          return this.updateAddressDatabaseAndLocally(address);
        } else {
          return this.storeAddressLocally(address);
        }
      })
    );
  });

  updateAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressStoreActions.updateAddress),
      mergeMap(({ address }: any) =>
        this.checkIfUserLoggedIn().pipe(
          map((userIsLoggedIn) => [address, userIsLoggedIn])
        )
      ),
      mergeMap(([address, userIsLoggedIn]) => {
        if (userIsLoggedIn) {
          return this.updateAddressDatabaseAndLocally(address);
        } else {
          return this.storeAddressLocally(address);
        }
      })
    );
  });

  private checkIfUserLoggedIn(): Observable<boolean> {
    return this.store.select(selectUserIsLoggedIn).pipe(first());
  }

  private updateAddressDatabaseAndLocally(address): Observable<any> {
    return this.userService.updateUserAddress(address).pipe(
      map((updatedUser) => {
        return AddressStoreActions.updateAddressSuccess({
          address: updatedUser.address,
        });
      }),
      catchError(() => {
        return of(AddressStoreActions.updateAddressFailure({ error: ERROR_MSG_SERVER }));
      })
    );
  }

  private storeAddressLocally(address) {
    return of(address).pipe(
      map((address) => AddressStoreActions.updateAddressSuccess({ address }))
    );
  }
}
