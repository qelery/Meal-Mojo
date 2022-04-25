import { User } from '../../shared/model';
import { BaseState } from '../root-state';

export interface UserState {
  user: User;
  token: string;
}

export interface UserLoginState extends BaseState {
  isLoading: boolean;
  error: string | null;
}

export interface UserRegistrationState extends BaseState {
  isLoading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  user: null,
  token: null,
};

export const initialUserLoginState: UserLoginState = {
  isLoading: false,
  error: null,
};

export const initialUserRegistrationState: UserRegistrationState = {
  isLoading: false,
  error: null,
};

export interface AuthState {
  userState: UserState;
  userLoginState: UserLoginState;
  userRegistrationState: UserRegistrationState;
}

export const initialAuthState: AuthState = {
  userState: initialUserState,
  userLoginState: initialUserLoginState,
  userRegistrationState: initialUserRegistrationState,
};
