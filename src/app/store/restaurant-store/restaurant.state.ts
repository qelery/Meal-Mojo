import { BaseState } from '../root-state';
import { Restaurant } from '@shared/model';

export interface RestaurantState extends BaseState {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
}

export const initialRestaurantState: RestaurantState = {
  restaurants: undefined,
  isLoading: false,
  error: null,
};
