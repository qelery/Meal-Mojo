import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse, RegisterRequest } from '@shared/model';

export const login = createAction(
  '[USER] LOGIN',
  props<{ loginRequest: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[USER] LOGIN SUCCESS',
  props<{ loginResponse: LoginResponse }>()
);

export const loginFailure = createAction(
  '[USER] LOGIN FAILURE',
  props<{ error: string }>()
);

export const register = createAction(
  '[USER] REGISTER',
  props<{ registerRequest: RegisterRequest }>()
);

export const registerSuccess = createAction(
  '[USER] REGISTER SUCCESS',
  props<{ registerResponse: LoginResponse }>()
);

export const registerFailure = createAction(
  '[USER] REGISTER FAILURE',
  props<{ error: string }>()
);

export const logout = createAction('[USER] LOGOUT USER');
