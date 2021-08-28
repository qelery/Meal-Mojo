import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const authFeature = createFeatureSelector<AuthState>(
  'authState'
);

export const selectLoginIsLoading = createSelector(
  authFeature,
  (authState: AuthState) => authState.userLoginState.isLoading,
);

export const selectErrorStatus = createSelector(
  authFeature,
  (authState: AuthState) => authState.userLoginState.errorStatus,
);

