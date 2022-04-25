import { Address } from '@shared/model';
import { BaseState } from '../root-state';

export interface AddressState extends BaseState {
  address: Address;
  isLoading: boolean;
  error: string | null;
}

export const initialAddressState: AddressState = {
  address: null,
  isLoading: false,
  error: null,
};
