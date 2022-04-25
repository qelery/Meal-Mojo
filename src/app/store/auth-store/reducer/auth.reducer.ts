import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState, initialAuthState, initialUserState } from '../auth.state';

export const authFeatureKey = 'authState';

const reducer = createReducer(
  initialAuthState,
  on(
    AuthActions.login,
    (state): AuthState => ({
      ...state,
      userLoginState: {
        ...state.userLoginState,
        isLoading: true,
      },
    })
  ),
  on(
    AuthActions.loginSuccess,
    (state, { loginResponse }): AuthState => ({
      ...state,
      userState: {
        ...initialUserState,
        user: loginResponse.user,
        token: loginResponse.token,
      },
      userLoginState: {
        ...state.userLoginState,
        isLoading: false,
        error: null,
      },
    })
  ),
  on(
    AuthActions.loginFailure,
    (state, { error }): AuthState => ({
      ...state,
      userLoginState: {
        ...state.userLoginState,
        isLoading: false,
        error,
      },
    })
  ),
  on(
    AuthActions.register,
    (state): AuthState => ({
      ...state,
      userRegistrationState: {
        ...state.userLoginState,
        isLoading: true,
      },
    })
  ),
  on(
    AuthActions.registerSuccess,
    (state, { registerResponse }): AuthState => ({
      ...state,
      userState: {
        ...initialUserState,
        user: registerResponse.user,
        token: registerResponse.token,
      },
      userRegistrationState: {
        ...state.userRegistrationState,
        isLoading: false,
        error: null,
      },
    })
  ),
  on(
    AuthActions.registerFailure,
    (state, { error }): AuthState => ({
      ...state,
      userRegistrationState: {
        ...state.userRegistrationState,
        isLoading: false,
        error,
      },
    })
  ),
  on(
    AuthActions.logout,
    (state): AuthState => ({
      ...state,
      userState: {
        ...initialUserState,
      },
    })
  )
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}
