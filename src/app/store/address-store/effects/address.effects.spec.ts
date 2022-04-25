import { TestBed } from '@angular/core/testing';
import { AddressEffects, ERROR_MSG_SERVER } from './address.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserService } from '../../../service/user/user.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockAddress, mockUser } from '@test/mock-data';
import { HttpErrorResponse } from '@angular/common/http';
import { AddressStoreActions } from '@store/address-store';
import { AuthStoreSelectors } from '@store/auth-store';

describe('AddressEffects', () => {
  let addressEffects: AddressEffects;
  let actions$ = new Observable<Action>();
  let userService: jasmine.SpyObj<UserService>;
  let mockStore: MockStore;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['updateUserAddress']);

    TestBed.configureTestingModule({
      providers: [
        AddressEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
        { provide: UserService, useValue: userServiceSpy },
      ],
    });

    addressEffects = TestBed.inject(AddressEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    mockStore = TestBed.inject(MockStore);
  });

  describe('when updateAddress$ fires successfully', () => {
    describe('and user is logged in', () => {
      it('should call user service to update address in database', () => {
        mockStore.overrideSelector(AuthStoreSelectors.selectUserIsLoggedIn, true);
        userService.updateUserAddress.and.returnValue(of(mockUser));
        actions$ = of(AddressStoreActions.updateAddress({ address: mockAddress }));

        addressEffects.updateAddress$.subscribe(() => {
          expect(userService.updateUserAddress).toHaveBeenCalledOnceWith(mockAddress);
        });
      });
      it('should dispatch update address success action', () => {
        mockStore.overrideSelector(AuthStoreSelectors.selectUserIsLoggedIn, true);
        userService.updateUserAddress.and.returnValue(of(mockUser));
        actions$ = of(AddressStoreActions.updateAddress({ address: mockAddress }));

        addressEffects.updateAddress$.subscribe((action) => {
          expect(action).toEqual(
            AddressStoreActions.updateAddressSuccess({ address: mockAddress })
          );
        });
      });
    });
    describe('and user is not logged in', () => {
      it('should dispatch update address success action', () => {
        mockStore.overrideSelector(AuthStoreSelectors.selectUserIsLoggedIn, false);
        actions$ = of(AddressStoreActions.updateAddress({ address: mockAddress }));

        addressEffects.updateAddress$.subscribe((action) => {
          expect(action).toEqual(
            AddressStoreActions.updateAddressSuccess({ address: mockAddress })
          );
        });
      });
    });
  });
  describe('when updateAddress$ fires unsuccessfully', () => {
    describe('and user is logged in', () => {
      it('should dispatch update address failure action', () => {
        mockStore.overrideSelector(AuthStoreSelectors.selectUserIsLoggedIn, true);
        const errResponse = new HttpErrorResponse({
          error: 'Error message from backend',
          status: 500,
        });
        userService.updateUserAddress.and.returnValue(throwError(() => errResponse));
        actions$ = of(AddressStoreActions.updateAddress({ address: mockAddress }));

        addressEffects.updateAddress$.subscribe((action) => {
          expect(action).toEqual(
            AddressStoreActions.updateAddressFailure({ error: ERROR_MSG_SERVER })
          );
        });
      });
    });
  });
});
