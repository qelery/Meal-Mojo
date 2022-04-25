import { createAction, props } from '@ngrx/store';
import { Address } from '@shared/model';

export const getUserAddress = createAction(
  '[ADDRESS] GET USER ADDRESS',
  props<{ address: Address }>()
);

export const getUserAddressSuccess = createAction(
  '[ADDRESS] GET USER ADDRESS SUCCESS',
  props<{ address: Address }>()
);

export const getUserAddressFailure = createAction(
  '[ADDRESS] GET USER ADDRESS FAILURE',
  props<{ error: string }>()
);

export const updateAddress = createAction(
  '[ADDRESS] UPDATE ADDRESS',
  props<{ address: Address }>()
);

export const updateAddressSuccess = createAction(
  '[ADDRESS] UPDATE ADDRESS SUCCESS',
  props<{ address: Address }>()
);

export const updateAddressFailure = createAction(
  '[ADDRESS] UPDATE ADDRESS FAILURE',
  props<{ error: string }>()
);

export const clearAddress = createAction('[ADDRESS] CLEAR ADDRESS');
