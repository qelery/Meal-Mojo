import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
