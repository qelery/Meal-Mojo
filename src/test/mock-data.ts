import { LoginRequest, LoginResponse } from '../app/service/auth/model';
import { User } from '../app/shared/model';

export const mockUser: User = {
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Smith',
  address: undefined,
};

export const mockLoginRequest: LoginRequest = {
  username: 'user123',
  password: 'pass123',
};

export const mockLoginResponse: LoginResponse = {
  token: '123abc',
  userInfo: mockUser,
};
