import {
  AuthState,
  initialAuthState,
  initialUserLoginState,
  initialUserRegistrationState,
  initialUserState,
} from '../auth.state';

import { mockUser } from '@test/mock-data';
import { deepCopy } from '@shared/utilities/test.utilties';
import {
  selectLoginError,
  selectLoginIsLoading,
  selectRegisterError,
  selectRegisterIsLoading,
  selectToken,
  selectUser,
  selectUserIsLoggedIn,
} from '@store/auth-store/selectors/auth.selectors';

describe('AuthSelector', () => {
  const mockToken = '123abc';
  const mockError = 'err';

  const mockAuthState: AuthState = {
    ...initialAuthState,
    userState: {
      ...initialUserState,
      user: mockUser,
      token: mockToken,
    },
    userLoginState: {
      ...initialUserLoginState,
      isLoading: false,
      error: mockError,
    },
    userRegistrationState: {
      ...initialUserRegistrationState,
      isLoading: false,
      error: mockError,
    },
  };

  describe('UserLoginState slice', () => {
    it('should select isLoading from state', () => {
      const result = selectLoginIsLoading.projector(mockAuthState);
      expect(result).toEqual(false);
    });

    it('should select error state', () => {
      const result = selectLoginError.projector(mockAuthState);
      expect(result).toEqual(mockError);
    });
  });

  describe('UserRegistrationState slice', () => {
    it('should select isLoading from state', () => {
      const result = selectRegisterIsLoading.projector(mockAuthState);
      expect(result).toEqual(false);
    });

    it('should select error from state', () => {
      const result = selectRegisterError.projector(mockAuthState);
      expect(result).toEqual(mockError);
    });
  });

  describe('UserState slice', () => {
    it('should select user from state', () => {
      const result = selectUser.projector(mockAuthState);
      expect(result).toEqual(mockUser);
    });

    it('should select if user is logged in from state, return true', () => {
      const mockAuthStateWithUser = deepCopy(mockAuthState);
      mockAuthStateWithUser.userState.user = mockUser;
      const result = selectUserIsLoggedIn.projector(mockAuthStateWithUser);
      expect(result).toEqual(true);
    });

    it('should select if user is logged in from state, return false', () => {
      const mockAuthStateNoUser = deepCopy(mockAuthState);
      mockAuthStateNoUser.userState.user = null;
      const result = selectUserIsLoggedIn.projector(mockAuthStateNoUser);
      expect(result).toEqual(false);
    });

    it('should select token from state', () => {
      const result = selectToken.projector(mockAuthState);
      expect(result).toEqual(mockToken);
    });
  });
});
