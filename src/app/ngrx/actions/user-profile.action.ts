import { createAction, props } from '@ngrx/store';
import { Address, User } from '../../shared/model';

export enum UserProfileActionTypes {
  UPDATE_USER_ADDRESS = '[LOCATION SEARCH] SAVE USER ADDRESS',
  UPDATE_USER_ADDRESS_SUCCESS = '[LOCATION SEARCH] SAVE USER ADDRESS SUCCESS',
  UPDATE_USER_ADDRESS_FAILURE = '[LOCATION SEARCH] SAVE USER ADDRESS FAILURE',
}

export const updateUserAddress = createAction(
  UserProfileActionTypes.UPDATE_USER_ADDRESS,
  props<{ address: Address }>()
);

export const updateUserAddressSuccess = createAction(
  UserProfileActionTypes.UPDATE_USER_ADDRESS_SUCCESS,
  props<{ updatedUserInfo: User }>()
);

export const updateUserAddressFailure = createAction(
  UserProfileActionTypes.UPDATE_USER_ADDRESS_FAILURE,
  props<{ error: string }>()
);
