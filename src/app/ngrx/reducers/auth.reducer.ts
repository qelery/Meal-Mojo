import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import { BaseState } from '../state/app.state';

export interface UserLoginState extends BaseState {
  isLoading: boolean;
  errorStatus: number | null;
}

export const initialUserLoginState = {
  isLoading: false,
  errorStatus: null,
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
      errorStatus: null,
    }
  })),
  on(AuthActions.loginUserFailure, (state, { errorStatus }): AuthState => ({
    ...state,
    userLoginState: {
      ...state.userLoginState,
      isLoading: false,
      errorStatus,
    }
  }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}
