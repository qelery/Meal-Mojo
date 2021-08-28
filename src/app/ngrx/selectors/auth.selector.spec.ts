import { AppState, initialAppState } from '../state/app.state';
import {
  initialAuthState,
  initialUserLoginState,
} from '../reducers/auth.reducer';
import { selectErrorStatus, selectLoginIsLoading } from './auth.selector';

describe('Auth Selectors', () => {
  const mockState: AppState = {
    ...initialAppState,
    authState: {
      ...initialAuthState,
      userLoginState: {
        ...initialUserLoginState,
        isLoading: false,
        errorStatus: 403,
      },
    },
  };

  it('should select isLoading from state', () => {
    expect(selectLoginIsLoading(mockState)).toEqual(
      mockState.authState.userLoginState.isLoading
    );
  });

  it('should select errorStatus from state', () => {
    expect(selectErrorStatus(mockState)).toEqual(
      mockState.authState.userLoginState.errorStatus
    );
  });
});
