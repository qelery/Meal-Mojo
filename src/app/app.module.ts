import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantInfoCardComponent } from './components/restaurants/restaurant-info-card/restaurant-info-card.component';
import { RestaurantStoreFrontComponent } from './components/restaurants/restaurant-store-front/restaurant-store-front.component';
import { MenuItemInfoCardComponent } from './components/menu-item-info-card/menu-item-info-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BannerSmallComponent } from './components/banner-small/banner-small.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { LoginModalComponent } from './components/modal/login-modal/login-modal.component';
import { authInterceptorProviders } from './service/auth-http-interceptor/auth-http-interceptor.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterModalComponent } from './components/modal/register-modal/register-modal.component';
import { NameAsyncValidatorDirective } from '@shared/custom-validators/name-async-validator/name-async-validator.directive';
import { SameValueValidatorDirective } from '@shared/custom-validators/same-value-validator/same-value-validator.directive';
import { GooglePlaceAutocompleteDirective } from '@shared/search/google-place-autocomplete.directive';
import { RootStoreModule } from '@store/root-store.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    AddressBarComponent,
    HomeComponent,
    LoginModalComponent,
    LogoutComponent,
    RestaurantsComponent,
    RestaurantInfoCardComponent,
    RestaurantStoreFrontComponent,
    MenuItemInfoCardComponent,
    BannerSmallComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    OrderCardComponent,
    RegisterModalComponent,
    NameAsyncValidatorDirective,
    SameValueValidatorDirective,
    GooglePlaceAutocompleteDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    RootStoreModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
