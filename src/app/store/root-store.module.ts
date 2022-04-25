import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env';
import { AuthStoreModule } from './auth-store';
import { CommonModule } from '@angular/common';
import { AddressStoreModule } from './address-store';
import { metaReducers, reducers } from './root-reducer';
import { RestaurantStoreModule } from '@store/restaurant-store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionTypeUniqueness: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      },
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Meal Mojo Store DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    AuthStoreModule,
    AddressStoreModule,
    RestaurantStoreModule,
  ],
})
export class RootStoreModule {}
