import { AppState, initialAppState } from '../state/app.state';
import {
  initialAuthState,
  initialUserLoginState,
} from '../reducers/auth.reducer';
import { selectLoginError, selectLoginIsLoading, selectRegisterError, selectRegisterIsLoading } from './auth.selector';
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

  describe('UserLoginState slice', () => {
    it('should select isLoading state', () => {
      expect(selectLoginIsLoading(mockState)).toEqual(
        mockState.authState.userLoginState.isLoading
      );
    });

    it('should select error state', () => {
      expect(selectLoginError(mockState)).toEqual(
        mockState.authState.userLoginState.error
      );
    });
  });

  describe('UserRegistrationState slice', () => {
    it('should select isLoading state', () => {
      expect(selectRegisterIsLoading(mockState)).toEqual(
        mockState.authState.userRegistrationState.isLoading
      );
    });

    it('should select error state', () => {
      expect(selectRegisterError(mockState)).toEqual(
        mockState.authState.userRegistrationState.error
      );
    });
  });
});
