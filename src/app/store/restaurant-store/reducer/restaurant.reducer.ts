import { Action, createReducer, on } from '@ngrx/store';
import * as RestaurantActions from '../actions/restaurant.actions';
import { RestaurantState, initialRestaurantState } from '../restaurant.state';

export const restaurantFeatureKey = 'restaurantState';

const reducer = createReducer(
  initialRestaurantState,
  on(
    RestaurantActions.getNearbyRestaurants,
    (state): RestaurantState => ({
      ...state,
      restaurants: undefined,
      isLoading: true,
      error: null,
    })
  ),
  on(
    RestaurantActions.getNearbyRestaurantsSuccess,
    (state, { restaurants }): RestaurantState => ({
      ...state,
      restaurants,
      isLoading: false,
      error: null,
    })
  ),
  on(
    RestaurantActions.getNearbyRestaurantsFailure,
    (state, { error }): RestaurantState => ({
      ...state,
      restaurants: undefined,
      isLoading: false,
      error,
    })
  )
);

export function restaurantReducer(
  state: RestaurantState,
  action: Action
): RestaurantState {
  return reducer(state, action);
}
