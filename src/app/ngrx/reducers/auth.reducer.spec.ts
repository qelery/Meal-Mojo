import {
  authReducer,
  AuthState,
  initialAuthState,
  initialUserLoginState,
} from './auth.reducer';
import {
  loginUser,
  loginUserFailure,
  loginUserSuccess,
} from '../actions/auth.action';
import { mockLoginRequest, mockLoginResponse } from '../../../test/mock-data';
import { LOGIN_ERROR_MSG_403 } from '../effects/auth.effects';

fdescribe('AuthReducer', () => {
  describe('for an unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };

      const state = authReducer(initialAuthState, action);

      expect(state).toBe(initialAuthState);
    });
  });

  describe('loginUser action', () => {
    it('should update the isLoading state in an immutable way', () => {
      const newAuthState: AuthState = {
        ...initialAuthState,
        userLoginState: {
          ...initialUserLoginState,
          isLoading: true,
        },
      };

      const action = loginUser({ loginRequest: mockLoginRequest });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });

  describe('loginUserSuccess action', () => {
    it('should update the isLoading and errorStatus state in an immutable way', () => {
      const newAuthState: AuthState = {
        ...initialAuthState,
        userLoginState: {
          ...initialUserLoginState,
          isLoading: false,
          error: null,
        },
      };

      const action = loginUserSuccess({ loginResponse: mockLoginResponse });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });

  describe('loginUserFailure action', () => {
    it('should update the isLoading and errorStatus state in an immutatble way', () => {
      const error = LOGIN_ERROR_MSG_403;
      const newAuthState: AuthState = {
        ...initialAuthState,
        userLoginState: {
          ...initialUserLoginState,
          isLoading: false,
          error,
        },
      };

      const action = loginUserFailure({ error });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });
});
