import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import { BaseState } from '../state/app.state';

export interface UserLoginState extends BaseState {
  isLoading: boolean;
  error: string | null;
}

export const initialUserLoginState = {
  isLoading: false,
  error: null,
};

export interface AuthState {
  userLoginState: UserLoginState;
}

export const initialAuthState: AuthState = {
  userLoginState: initialUserLoginState
};

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.loginUser, (state): AuthState => ({
    ...state,
    userLoginState: {
      ...state.userLoginState,
      isLoading: true,
    }
  })),
  on(AuthActions.loginUserSuccess, (state): AuthState => ({
    ...state,
    userLoginState: {
      ...state.userLoginState,
      isLoading: false,
      error: null,
    }
  })),
  on(AuthActions.loginUserFailure, (state, { error }): AuthState => ({
    ...state,
    userLoginState: {
      ...state.userLoginState,
      isLoading: false,
      error,
    }
  }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}
