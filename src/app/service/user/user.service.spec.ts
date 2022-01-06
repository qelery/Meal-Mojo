import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthHttpInterceptor } from '../auth-http-interceptor/auth-http-interceptor.service';
import { environment } from '@env';
import { mockAddress, mockUser } from '../../test/mock-data';
import { UserService } from './user.service';
import { User } from '../../shared/model';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthHttpInterceptor],
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should use the http service to update user info', () => {
    const updatedUserInfo = mockUser;
    userService.updateUserInfo(updatedUserInfo).subscribe((res: User) => {
      expect(res).toEqual(updatedUserInfo);
    });

    const req = httpMock.expectOne(`${environment.restApiUrl}/api/users`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toBe(updatedUserInfo);

    req.flush(updatedUserInfo);
  });

  it('should use the http service to update user address', () => {
    const updatedUserAddress = mockAddress;
    const updatedUserResponse = mockUser;
    userService.updateUserAddress(updatedUserAddress).subscribe((res: User) => {
      expect(res).toEqual(updatedUserResponse);
    });

    const req = httpMock.expectOne(`${environment.restApiUrl}/api/users/address`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toBe(updatedUserAddress);

    req.flush(updatedUserResponse);
  });
});
