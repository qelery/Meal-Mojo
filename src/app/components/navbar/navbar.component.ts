import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthStoreSelectors } from '@store/auth-store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  registerModalIsVisible = false;
  loginModalIsVisible = false;
  isUserLoggedIn = this.store.select(AuthStoreSelectors.selectUserIsLoggedIn);

  constructor(private readonly store: Store) {}

  showRegister() {
    this.registerModalIsVisible = true;
  }

  showLoginModal() {
    this.loginModalIsVisible = true;
  }

  hideModal() {
    this.loginModalIsVisible = false;
    this.registerModalIsVisible = false;
  }

  switchModal() {
    this.loginModalIsVisible = !this.loginModalIsVisible;
    this.registerModalIsVisible = !this.registerModalIsVisible;
  }
}
