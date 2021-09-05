import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showRegisterCard: boolean;
  showLoginCard: boolean;
  isUserLoggedIn: boolean;
  currentAddress: any;

  constructor(private localStorageService: LocalStorageService) {
    this.showLoginCard = false;
  }

  ngOnInit(): void {
    this.localStorageService.userSubject.subscribe((user) => {
      this.isUserLoggedIn = !!user;
    });
  }

  showRegister() {
    this.showRegisterCard = true;
  }

  showLoginModal() {
    this.showLoginCard = true;
  }

  hideLoginModal() {
    this.showLoginCard = false;
  }
}
