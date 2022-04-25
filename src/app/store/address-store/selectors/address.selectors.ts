import { createFeatureSelector, createSelector } from '@ngrx/store';
import { addressFeatureKey } from '@store/address-store/reducer/address.reducer';
import { AddressState } from '@store/address-store/address.state';

export const selectAddressState = createFeatureSelector<AddressState>(addressFeatureKey);

export const selectAddress = createSelector(
  selectAddressState,
  (addressState: AddressState) => addressState.address
);

export const selectAddressIsLoading = createSelector(
  selectAddressState,
  (addressState: AddressState) => addressState.isLoading
);

export const selectAddressError = createSelector(
  selectAddressState,
  (addressState: AddressState) => addressState.error
);
