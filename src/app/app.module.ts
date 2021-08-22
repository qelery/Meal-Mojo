import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';
import { BrickComponent } from './components/brick/brick.component';
import { HomeComponent } from './components/home/home.component';


import { LogoutComponent } from './components/logout/logout.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantInfoCardComponent } from './components/restaurant-info-card/restaurant-info-card.component';
import { RestaurantStoreFrontComponent } from './components/restaurant-store-front/restaurant-store-front.component';
import { MenuItemInfoCardComponent } from './components/menu-item-info-card/menu-item-info-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {BannerSmallComponent} from "./components/banner-small/banner-small.component";
import {AgmCoreModule} from "@agm/core";
import {environment} from "../environments/environment";
import { OrdersComponent } from './components/orders/orders.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import {LoginRegistrationModalComponent} from "./components/login-registration-card/login-registration-modal.component";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './ngrx/state/app.state';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    AddressBarComponent,
    BrickComponent,
    HomeComponent,
    LoginRegistrationModalComponent,
    LogoutComponent,
    RestaurantsComponent,
    RestaurantInfoCardComponent,
    RestaurantStoreFrontComponent,
    MenuItemInfoCardComponent,
    BannerSmallComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    OrderCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
