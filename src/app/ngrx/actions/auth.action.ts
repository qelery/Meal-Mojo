import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse, RegisterRequest } from '../reducers/auth.reducer';

export enum AuthActionTypes {
  LOGIN_USER = '[LOGIN MODAL] LOGIN USER',
  LOGIN_USER_SUCCESS = '[LOGIN MODAL] LOGIN USER SUCCESS',
  LOGIN_USER_FAILURE = '[LOGIN MODAL] LOGIN USER FAILURE',
  REGISTER_USER = '[REGISTER MODAL] REGISTER USER',
  REGISTER_USER_SUCCESS = '[REGISTER MODAL] REGISTER USER SUCCESS',
  REGISTER_USER_FAILURE = '[REGISTER MODAL] REGISTER USER FAILURE',
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
  props<{ error: string }>()
);

export const registerUser = createAction(
  AuthActionTypes.REGISTER_USER,
  props<{ registerRequest: RegisterRequest }>()
);

export const registerUserSuccess = createAction(
  AuthActionTypes.REGISTER_USER_SUCCESS,
  props<{ registerResponse: LoginResponse }>()
);

export const registerUserFailure = createAction(
  AuthActionTypes.REGISTER_USER_FAILURE,
  props<{ error: string }>()
);
