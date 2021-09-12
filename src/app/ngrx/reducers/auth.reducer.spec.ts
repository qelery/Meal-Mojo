import {
  authReducer,
  AuthState,
  initialAuthState,
  initialUserLoginState,
  initialUserRegistrationState,
} from './auth.reducer';
import {
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  registerUser,
  registerUserFailure, registerUserSuccess,
} from '../actions/auth.action';
import {
  mockLoginRequest,
  mockLoginResponse,
  mockRegisterRequest,
} from '../../test/mock-data';
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

  describe('for a loginUser action', () => {
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

  describe('for a loginUserSuccess action', () => {
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

  describe('for a loginUserFailure action', () => {
    it('should update the isLoading and error state in an immutable way', () => {
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

  describe('for a registerUser action', () => {
    it('should update the isLoading state in an immutable way', () => {
      const newAuthState: AuthState = {
        ...initialAuthState,
        userRegistrationState: {
          ...initialUserRegistrationState,
          isLoading: true,
        },
      };

      const action = registerUser({ registerRequest: mockRegisterRequest });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });

  describe('for a registerUserSuccess action', () => {
    it('should update the isLoading and error state in an immutable way', () => {
      const newAuthState: AuthState = {
        ...initialAuthState,
        userRegistrationState: {
          ...initialUserRegistrationState,
          isLoading: false,
          error: null,
        },
      };

      const action = registerUserSuccess({ registerResponse: mockLoginResponse });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });

  describe('for a registerUserFailure action', () => {
    it('should update the isLoading and error state in an immutable way', () => {
      const error = 'err';
      const newAuthState: AuthState = {
        ...initialAuthState,
        userRegistrationState: {
          ...initialUserRegistrationState,
          isLoading: false,
          error,
        },
      };

      const action = registerUserFailure({ error });
      const state = authReducer(initialAuthState, action);

      expect(state).toEqual(newAuthState);
      expect(state).not.toBe(newAuthState);
    });
  });
});
