import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { AddressEffects } from '@store/address-store/effects/address.effects';
import { AuthEffects } from '@store/auth-store/effects/auth.effects';
import { reducers, storageSyncReducer } from '@store/root-reducer';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockAddress, mockLoginResponse, mockUser } from '@test/mock-data';
import { AuthStoreActions } from '@store/auth-store';
import { AddressStoreActions } from '@store/address-store';

describe('StorageSyncReducer', () => {
  let storage: any;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EffectsModule.forRoot([AddressEffects, AuthEffects]),
        StoreModule.forRoot(reducers, { metaReducers: [storageSyncReducer] }),
        HttpClientTestingModule,
      ],
    });
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    storage = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => storage[key]);
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => (storage[key] = value)
    );
    spyOn(localStorage, 'removeItem').and.callFake((key: string) =>
      storage[key] !== undefined ? storage[key] : null
    );
  });

  describe('authState of NgRx', () => {
    it(`should persist in local storage excluding 'userRegistrationState' and 'userLoginState' keys`, () => {
      const expectedUserState = {
        user: mockLoginResponse.user,
        token: mockLoginResponse.token,
      };

      store.dispatch(AuthStoreActions.loginSuccess({ loginResponse: mockLoginResponse }));

      const localStorageItem = JSON.parse(localStorage.getItem('authState'));
      expect(localStorageItem.userState).toEqual(expectedUserState);
      expect(localStorageItem.userRegistrationState).toBeUndefined();
      expect(localStorageItem.userLoginState).toBeUndefined();
    });

    it('should be nulled in localStorage when user logs out', () => {
      const expectedUserState = {
        user: null,
        token: null,
      };
      storage.authState = { userState: { user: mockUser, token: '123abc' } };

      store.dispatch(AuthStoreActions.logout());

      const localStorageItem = JSON.parse(localStorage.getItem('authState'));
      expect(localStorageItem.userState).toEqual(expectedUserState);
    });
  });

  describe('addressState of NgRx', () => {
    it(`should persist in local storage excluding 'isLoading' and 'error' keys`, () => {
      const expectedAddressState = {
        address: mockAddress,
      };

      store.dispatch(AddressStoreActions.updateAddressSuccess({ address: mockAddress }));

      const localStorageItem = JSON.parse(localStorage.getItem('addressState'));
      expect(localStorageItem).toEqual(expectedAddressState);
      expect(localStorageItem.isLoading).toBeUndefined();
      expect(localStorageItem.error).toBeUndefined();
    });

    it('should be nulled in localStorage when user logs out', () => {
      const expectedAddressState = {
        address: null,
      };
      storage.addressState = mockAddress;

      store.dispatch(AuthStoreActions.logout());

      const localStorageItem = JSON.parse(localStorage.getItem('addressState'));
      expect(localStorageItem).toEqual(expectedAddressState);
    });
  });
});
