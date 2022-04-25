import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { addressFeatureKey, addressReducer } from './reducer/address.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AddressEffects } from './effects/address.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(addressFeatureKey, addressReducer),
    EffectsModule.forFeature([AddressEffects]),
  ],
})
export class AddressStoreModule {}
