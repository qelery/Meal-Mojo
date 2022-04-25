import {
  mockLoginRequest,
  mockLoginResponse,
  mockRegisterRequest,
  mockUser,
} from '@test/mock-data';
import { LOGIN_ERROR_MSG_403 } from '../effects/auth.effects';
import {
  initialAuthState,
  initialUserLoginState,
  initialUserRegistrationState,
  initialUserState,
} from '@store/auth-store/auth.state';
import { authReducer } from '@store/auth-store/reducer/auth.reducer';
import { AuthStoreActions } from '@store/auth-store';

describe('AuthReducer', () => {
  describe('for an unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };

      const state = authReducer(initialAuthState, action);

      expect(state).toBe(initialAuthState);
    });
  });

  describe('for a login action', () => {
    it('should update the isLoading state in an immutable way', () => {
      const newAuthState = {
        ...initialAuthState,
        userLoginState: {
          ...initialUserLoginState,
          isLoading: true,
        },
      };

      const action = AuthStoreActions.login({ loginRequest: mockLoginRequest });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });

  describe('for a loginSuccess action', () => {
    it('should update the isLoading and errorStatus state in an immutable way', () => {
      const newAuthState = {
        ...initialAuthState,
        userState: {
          ...initialUserState,
          user: mockLoginResponse.user,
          token: mockLoginResponse.token,
        },
        userLoginState: {
          ...initialUserLoginState,
          isLoading: false,
          error: null,
        },
      };

      const action = AuthStoreActions.loginSuccess({ loginResponse: mockLoginResponse });
      const state = authReducer(initialAuthState, action);

      expect(state.userLoginState).toEqual(newAuthState.userLoginState);
      expect(state.userLoginState).not.toBe(newAuthState.userLoginState);
    });

    it('should update the state with user info and auth token', () => {
      const newAuthState = {
        ...initialAuthState,
        userState: {
          ...initialUserState,
          user: mockLoginResponse.user,
          token: mockLoginResponse.token,
        },
        userLoginState: {
          ...initialUserLoginState,
          isLoading: false,
          error: null,
        },
      };

      const action = AuthStoreActions.loginSuccess({ loginResponse: mockLoginResponse });
      const state = authReducer(initialAuthState, action);

      expect(state.userState).toEqual(newAuthState.userState);
      expect(state.userState).not.toBe(newAuthState.userState);
    });
  });

  describe('for a loginFailure action', () => {
    it('should update the isLoading and error state in an immutable way', () => {
      const error = LOGIN_ERROR_MSG_403;
      const newAuthState = {
        ...initialAuthState,
        userLoginState: {
          ...initialUserLoginState,
          isLoading: false,
          error,
        },
      };

      const action = AuthStoreActions.loginFailure({ error });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });

  describe('for a register action', () => {
    it('should update the isLoading state in an immutable way', () => {
      const newAuthState = {
        ...initialAuthState,
        userRegistrationState: {
          ...initialUserRegistrationState,
          isLoading: true,
        },
      };

      const action = AuthStoreActions.register({ registerRequest: mockRegisterRequest });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });

  describe('for a registerSuccess action', () => {
    it('should update the isLoading and error state in an immutable way', () => {
      const newAuthState = {
        ...initialAuthState,
        userState: {
          ...initialUserState,
          user: mockLoginResponse.user,
          token: mockLoginResponse.token,
        },
        userRegistrationState: {
          ...initialUserRegistrationState,
          isLoading: false,
          error: null,
        },
      };

      const action = AuthStoreActions.registerSuccess({
        registerResponse: mockLoginResponse,
      });
      const state = authReducer(initialAuthState, action);

      expect(state.userRegistrationState).toEqual(newAuthState.userRegistrationState);
      expect(state.userRegistrationState).not.toBe(newAuthState.userRegistrationState);
    });

    it('should update the state with user info and auth token', () => {
      const newAuthState = {
        ...initialAuthState,
        userState: {
          ...initialUserState,
          user: mockLoginResponse.user,
          token: mockLoginResponse.token,
        },
        userRegistrationState: {
          ...initialUserRegistrationState,
          isLoading: false,
          error: null,
        },
      };

      const action = AuthStoreActions.registerSuccess({
        registerResponse: mockLoginResponse,
      });
      const state = authReducer(initialAuthState, action);

      expect(state.userState).toEqual(newAuthState.userState);
      expect(state.userState).not.toBe(newAuthState.userState);
    });
  });

  describe('for a registerFailure action', () => {
    it('should update the isLoading and error state in an immutable way', () => {
      const error = 'err';
      const newAuthState = {
        ...initialAuthState,
        userRegistrationState: {
          ...initialUserRegistrationState,
          isLoading: false,
          error,
        },
      };

      const action = AuthStoreActions.registerFailure({ error });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });

  describe('for a logout action', () => {
    it('should reset the userState slice of authState', () => {
      const currentAuthState = {
        ...initialAuthState,
        userState: {
          user: mockUser,
          token: '123ABC',
        },
      };
      const expectedAuthState = {
        ...initialAuthState,
        userState: {
          ...initialUserState,
        },
      };

      const action = AuthStoreActions.logout();
      const state = authReducer(currentAuthState, action);

      expect(state).toEqual(expectedAuthState);
      expect(state).not.toBe(expectedAuthState);
    });
  });
});
