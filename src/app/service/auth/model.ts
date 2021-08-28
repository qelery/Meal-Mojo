import { Role, User } from '../../shared/model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userInfo: User;
  token: string;
}

export interface UserRegistrationRequest {
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
}
