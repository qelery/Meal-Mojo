import { mockAddress } from '@test/mock-data';
import { addressReducer } from '@store/address-store/reducer/address.reducer';
import { initialAddressState } from '@store/address-store/address.state';
import { AddressStoreActions } from '@store/address-store';

describe('AddressReducer', () => {
  const address = mockAddress;

  describe('for an unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };

      const state = addressReducer(initialAddressState, action);

      expect(state).toBe(initialAddressState);
    });
  });

  describe('for an updateAddress action', () => {
    it('should update isLoading state an immutable way', () => {
      const newAddressState = {
        ...initialAddressState,
        isLoading: true,
      };

      const action = AddressStoreActions.updateAddress({ address });
      const state = addressReducer(initialAddressState, action);

      expect(state).toEqual(newAddressState);
      expect(state).not.toBe(newAddressState);
    });
  });

  describe('for an updateAddressSuccess action', () => {
    it('should update isLoading and error state an immutable way', () => {
      const newAddressState = {
        ...initialAddressState,
        address,
        isLoading: false,
        error: null,
      };

      const action = AddressStoreActions.updateAddressSuccess({ address });
      const state = addressReducer(initialAddressState, action);

      expect(state).toEqual(newAddressState);
      expect(state).not.toBe(newAddressState);
    });
  });

  describe('for an updateAddressFailure action', () => {
    it('should update isLoading and error state an immutable way', () => {
      const error = 'err';
      const newAddressState = {
        ...initialAddressState,
        isLoading: false,
        error,
      };

      const action = AddressStoreActions.updateAddressFailure({ error });
      const state = addressReducer(initialAddressState, action);

      expect(state).toEqual(newAddressState);
      expect(state).not.toBe(newAddressState);
    });
  });

  describe('for an clearAddress action', () => {
    it('should reset address slice of state', () => {
      const addressState = {
        ...initialAddressState,
        address,
      };

      const action = AddressStoreActions.clearAddress();
      const state = addressReducer(addressState, action);

      expect(state).toEqual(initialAddressState);
    });
  });
});
