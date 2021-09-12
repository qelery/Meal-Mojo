import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  registerModalIsVisible = false;
  loginModalIsVisible = false;
  isUserLoggedIn: boolean;
  currentAddress: any;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.userSubject.subscribe((user) => {
      this.isUserLoggedIn = !!user;
    });
  }

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
