import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RestaurantService } from '../../../service/restaurant/restaurant.service';
import { RestaurantStoreActions } from '@store/restaurant-store';
import { exhaustMap, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RestaurantEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly restaurantService: RestaurantService
  ) {}

  getRestaurantsNearby$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RestaurantStoreActions.getNearbyRestaurants),
      exhaustMap(({ address }: any) =>
        this.restaurantService.getRestaurantsNearby(address).pipe(
          map((restaurants) =>
            RestaurantStoreActions.getNearbyRestaurantsSuccess({ restaurants })
          ),
          catchError((errorResp: HttpErrorResponse) => {
            const error = errorResp.message;
            return of(RestaurantStoreActions.getNearbyRestaurantsFailure({ error }));
          })
        )
      )
    );
  });
}
