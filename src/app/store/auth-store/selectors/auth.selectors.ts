import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth.state';
import { authFeatureKey } from '../reducer/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectLoginIsLoading = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.userLoginState.isLoading
);

export const selectLoginError = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.userLoginState.error
);

export const selectRegisterIsLoading = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.userRegistrationState.isLoading
);

export const selectRegisterError = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.userRegistrationState.error
);

export const selectUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.userState.user
);

export const selectUserIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => !!authState.userState.user
);

export const selectToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.userState.token
);
