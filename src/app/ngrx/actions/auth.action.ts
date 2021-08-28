import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from '../../service/auth/model';

export enum AuthActionTypes {
  LOGIN_USER = '[LOGIN MODAL] LOGIN USER',
  LOGIN_USER_SUCCESS = '[LOGIN MODAL] LOGIN USER SUCCESS',
  LOGIN_USER_FAILURE = '[LOGIN MODAL] LOGIN USER FAILURE',
}

export const loginUser = createAction(
  AuthActionTypes.LOGIN_USER,
  props<{ loginRequest: LoginRequest }>()
);

export const loginUserSuccess = createAction(
  AuthActionTypes.LOGIN_USER_SUCCESS,
  props<{ loginResponse: LoginResponse }>()
);

export const loginUserFailure = createAction(
  AuthActionTypes.LOGIN_USER_FAILURE,
  props<{ errorStatus: number }>()
);
