import { AuthStoreState } from './auth-store';
import { AddressStoreState } from './address-store';
import { RestaurantStoreState } from './restaurant-store';

export interface BaseState {
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  authState: AuthStoreState.AuthState;
  addressState: AddressStoreState.AddressState;
  restaurantState: RestaurantStoreState.RestaurantState;
}

export const initialAppState: AppState = {
  authState: AuthStoreState.initialAuthState,
  addressState: AddressStoreState.initialAddressState,
  restaurantState: RestaurantStoreState.initialRestaurantState,
};
