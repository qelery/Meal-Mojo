import { Action, createReducer, on } from '@ngrx/store';
import { AddressState, initialAddressState } from '../address.state';
import { AddressStoreActions } from '../index';

export const addressFeatureKey = 'addressState';

const reducer = createReducer(
  initialAddressState,
  on(
    AddressStoreActions.updateAddress,
    (state): AddressState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    AddressStoreActions.updateAddressSuccess,
    (state, { address }): AddressState => ({
      ...state,
      address,
      isLoading: false,
      error: null,
    })
  ),
  on(
    AddressStoreActions.updateAddressFailure,
    (state, { error }): AddressState => ({
      ...state,
      isLoading: false,
      error,
    })
  ),
  on(
    AddressStoreActions.clearAddress,
    (): AddressState => ({
      ...initialAddressState,
    })
  )
);

export function addressReducer(state: AddressState, action: Action): AddressState {
  return reducer(state, action);
}
