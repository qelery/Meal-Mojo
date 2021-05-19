import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { AddressBarComponent } from './address-bar/address-bar.component';
import { BrickComponent } from './brick/brick.component';
import { HomeComponent } from './home/home.component';

import { SignInCard } from './signin-card/sign-in-card.component';
import { LogoutComponent } from './logout/logout.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantInfoCardComponent } from './restaurant-info-card/restaurant-info-card.component';
import { RestaurantStoreFrontComponent } from './restaurant-store-front/restaurant-store-front.component';
import { MenuItemInfoCardComponent } from './menu-item-info-card/menu-item-info-card.component';
import { RestaurantStoreFrontBannerComponent } from './restaurant-store-front-banner/restaurant-store-front-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    AddressBarComponent,
    BrickComponent,
    HomeComponent,
    SignInCard,
    LogoutComponent,
    RestaurantsComponent,
    RestaurantInfoCardComponent,
    RestaurantStoreFrontComponent,
    MenuItemInfoCardComponent,
    RestaurantStoreFrontBannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
