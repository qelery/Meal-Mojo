import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {LogoutComponent} from "./logout/logout.component";
import {RestaurantsComponent} from "./restaurants/restaurants.component";
import {RestaurantStoreFrontComponent} from "./restaurant-store-front/restaurant-store-front.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent
  },
  {
    path: 'restaurants/:id',
    component: RestaurantStoreFrontComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
