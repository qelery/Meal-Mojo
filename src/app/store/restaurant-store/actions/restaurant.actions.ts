import { createAction, props } from '@ngrx/store';
import { Address, Restaurant } from '@shared/model';

export const getNearbyRestaurants = createAction(
  '[RESTAURANT] GET NEARBY RESTAURANTS',
  props<{ address: Address }>()
);

export const getNearbyRestaurantsSuccess = createAction(
  '[RESTAURANT] GET NEARBY RESTAURANTS SUCCESS',
  props<{ restaurants: Restaurant[] }>()
);

export const getNearbyRestaurantsFailure = createAction(
  '[RESTAURANT] GET NEARBY RESTAURANTS FAILURE]',
  props<{ error: string }>()
);
