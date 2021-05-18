import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showRegisterCard: boolean;
  showLoginCard: boolean;
  currentUser: any;

  constructor(private userService: UserService) {
    this.showRegisterCard = false;
    this.showLoginCard = false;
  }

  ngOnInit(): void {
    console.log("HEREEEE")
    this.userService.searchSubject.subscribe(currentUser => {
      console.log("HEreee2")
      this.currentUser = currentUser;
      console.log(currentUser);
    });
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
