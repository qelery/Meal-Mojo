import { AuthEffects, ERROR_MSG_SERVER } from './auth.effects';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { loginUser } from '../actions/auth.action';

import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';

import { mockAddress, mockLoginRequest, mockUser } from '../../test/mock-data';
import { UserService } from '../../service/user/user.service';
import { UserProfileEffects } from './user-profile.effects';
import { updateUserAddress, updateUserAddressFailure, updateUserAddressSuccess } from '../actions/user-profile.action';

describe('UserProfileEffects', () => {
  let userProfileEffects: UserProfileEffects;
  let actions$ = new Observable<Action>();
  let userService: jasmine.SpyObj<UserService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['updateUserInfo', 'updateUserAddress']);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'saveAddress',
      'saveUser',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserProfileEffects,
        provideMockActions(() => actions$),
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
      ],
    });

    userProfileEffects = TestBed.inject(UserProfileEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  describe('on saveUserAddress$', () => {
    describe('should fire successfully', () => {
      it('and dispatch a success action', () => {
        userService.updateUserAddress.and.returnValue(of(mockUser));
        actions$ = of(updateUserAddress({ address: mockAddress }));

        userProfileEffects.updateUserAddress$.subscribe((action) => {
          expect(action).toEqual(
            updateUserAddressSuccess({ updatedUserInfo: mockUser }),
          );
          expect(userService.updateUserAddress).toHaveBeenCalledOnceWith(
            mockAddress,
          );
        });
      });

      it('and call LocalStorageService to update user info and user address', () => {
        userService.updateUserAddress.and.returnValue(of(mockUser));
        actions$ = of(updateUserAddressSuccess({ updatedUserInfo: mockUser }));

        userProfileEffects.updateUserAddressSuccess$.subscribe();

        expect(localStorageService.saveAddress).toHaveBeenCalledOnceWith(
          mockAddress,
        );
        expect(localStorageService.saveUser).toHaveBeenCalledOnceWith(
          mockUser,
        );
      });
    });


    it('should fire unsuccessfully', () => {
      const errorResp = new HttpErrorResponse({
        error: 'Error message from backend',
        status: 500,
      });
      userService.updateUserAddress.and.returnValue(throwError(errorResp));
      actions$ = of(updateUserAddress({ address: mockAddress }));

      userProfileEffects.updateUserAddress$.subscribe((action) => {
        expect(action).toEqual(
          updateUserAddressFailure({ error: ERROR_MSG_SERVER }),
        );
        expect(userService.updateUserAddress).toHaveBeenCalledOnceWith(
          mockAddress,
        );
      });

    });
  });
});
