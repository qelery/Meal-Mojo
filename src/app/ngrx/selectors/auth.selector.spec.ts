import { AppState, initialAppState } from '../state/app.state';
import {
  initialAuthState,
  initialUserLoginState,
} from '../reducers/auth.reducer';
import { selectLoginError, selectLoginIsLoading } from './auth.selector';
import { LOGIN_ERROR_MSG_403 } from '../effects/auth.effects';

fdescribe('Auth Selectors', () => {
  const mockState: AppState = {
    ...initialAppState,
    authState: {
      ...initialAuthState,
      userLoginState: {
        ...initialUserLoginState,
        isLoading: false,
        error: LOGIN_ERROR_MSG_403,
      },
    },
  };

  it('should select isLoading from state', () => {
    expect(selectLoginIsLoading(mockState)).toEqual(
      mockState.authState.userLoginState.isLoading
    );
  });

  it('should select errorStatus from state', () => {
    expect(selectLoginError(mockState)).toEqual(
      mockState.authState.userLoginState.error
    );
  });
});
