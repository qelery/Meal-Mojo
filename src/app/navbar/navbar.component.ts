import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showRegisterCard: boolean;
  showLoginCard: boolean;

  constructor() {
    this.showRegisterCard = false;
    this.showLoginCard = false;
  }

  ngOnInit(): void {
  }

  showRegister() {
    this.showRegisterCard = true;
  }

  showLogIn() {
    this.showLoginCard = true;
  }

  hideSignInComponent() {
    this.showRegisterCard = false;
    this.showLoginCard = false;
  }
}
