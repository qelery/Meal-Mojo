import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storageSync } from '@larscom/ngrx-store-storagesync';
import { AuthStoreReducer } from './auth-store';
import { AddressStoreReducer } from './address-store';
import { environment } from '@env';
import { storeFreeze } from 'ngrx-store-freeze';
import { AppState } from './root-state';
import { RestaurantStoreReducer } from '@store/restaurant-store';

/**
 * Persists the indicated slices of the NgRx state in local storage (or session storage).
 * Keeps local storage and the NgRx state in sync.
 */
export function storageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return storageSync<string>({
    features: [
      { stateKey: 'authState', excludeKeys: ['userRegistrationState', 'userLoginState'] },
      { stateKey: 'addressState', excludeKeys: ['isLoading', 'error'] },
    ],
    storage: window.localStorage,
  })(reducer);
}

export const reducers: ActionReducerMap<AppState> = {
  authState: AuthStoreReducer.authReducer,
  addressState: AddressStoreReducer.addressReducer,
  restaurantState: RestaurantStoreReducer.restaurantReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze, storageSyncReducer]
  : [storageSyncReducer];
