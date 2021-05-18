import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninCardComponent} from "./signin-card/signin-card.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: 'register',
    component: SigninCardComponent
  },
  {
    path: 'login',
    component: SigninCardComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
