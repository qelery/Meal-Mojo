import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantState } from '@store/restaurant-store/restaurant.state';
import { restaurantFeatureKey } from '@store/restaurant-store/reducer/restaurant.reducer';

export const selectRestaurantState =
  createFeatureSelector<RestaurantState>(restaurantFeatureKey);

export const selectNearbyRestaurantsIsLoading = createSelector(
  selectRestaurantState,
  (restaurantState: RestaurantState) => restaurantState.isLoading
);

export const selectNearbyRestaurantsError = createSelector(
  selectRestaurantState,
  (restaurantState: RestaurantState) => restaurantState.error
);

export const selectNearbyRestaurants = createSelector(
  selectRestaurantState,
  (restaurantState: RestaurantState) => restaurantState.restaurants
);
