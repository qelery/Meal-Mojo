import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  restaurantFeatureKey,
  restaurantReducer,
} from '@store/restaurant-store/reducer/restaurant.reducer';
import { RestaurantEffects } from '@store/restaurant-store/effects/restaurant.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(restaurantFeatureKey, restaurantReducer),
    EffectsModule.forFeature([RestaurantEffects]),
  ],
})
export class RestaurantStoreModule {}
