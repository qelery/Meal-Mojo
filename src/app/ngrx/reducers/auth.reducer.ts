import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import { BaseState } from '../state/app.state';
import { Role, User } from '../../shared/model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userInfo: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export interface UserLoginState extends BaseState {
  isLoading: boolean;
  error: string | null;
}

export interface UserRegistrationState extends BaseState {
  isLoading: boolean;
  error: string | null;
}

export const initialUserLoginState = {
  isLoading: false,
  error: null,
};

export const initialUserRegistrationState = {
  isLoading: false,
  error: null,
};

export interface AuthState {
  userLoginState: UserLoginState;
  userRegistrationState: UserRegistrationState;
}

export const initialAuthState: AuthState = {
  userLoginState: initialUserLoginState,
  userRegistrationState: initialUserRegistrationState,
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
  })),
  on(AuthActions.registerUser, (state): AuthState => ({
    ...state,
    userRegistrationState: {
      ...state.userLoginState,
      isLoading: true,
    }
  })),
  on(AuthActions.registerUserSuccess, (state): AuthState => ({
    ...state,
    userRegistrationState: {
      ...state.userRegistrationState,
      isLoading: false,
      error: null,
    }
  })),
  on(AuthActions.registerUserFailure, (state, { error }): AuthState => ({
    ...state,
    userRegistrationState: {
      ...state.userRegistrationState,
      isLoading: false,
      error,
    }
  }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}
