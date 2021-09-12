import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../app/service/auth/model';
import { Role, User } from '../app/shared/model';

export const mockUser: User = {
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Smith',
  address: null,
};

export const mockLoginRequest: LoginRequest = {
  username: 'john@example.com',
  password: 'pass123',
};

export const mockLoginResponse: LoginResponse = {
  token: '123abc',
  userInfo: mockUser,
};

export const mockRegisterRequest: RegisterRequest = {
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Smith',
  password: 'pass123',
  role: Role.CUSTOMER,
};
