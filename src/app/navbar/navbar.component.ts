import {Component, OnChanges, OnInit} from '@angular/core';
import {UserService} from "../service/user/user.service";
import {LocationService} from "../service/location/location.service";
import {SignInCardType} from "../signin-card/sign-in-card.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  showRegisterCard: boolean;
  showLoginCard: boolean;
  isUserLoggedIn: any;
  currentAddress: any;
  SignInCardType = SignInCardType;

  constructor(private userService: UserService, private  locationService: LocationService) {
    this.showRegisterCard = false;
    this.showLoginCard = false;
  }

  ngOnInit(): void {
    this.locationService.formattedAddressSubject.subscribe(currentAddress => {
      this.currentAddress = currentAddress;
    })
    if (localStorage.getItem('token')) {
      this.isUserLoggedIn = true;
      return;
    }
    this.userService.searchSubject.subscribe(currentUser => {
        this.isUserLoggedIn = !!currentUser;
    });
  }

  ngOnChanges(): void {
    if (localStorage.getItem('token')) {
      this.isUserLoggedIn = true;
    }
    if (localStorage.getItem('latitude')) {
      this.currentAddress = true;
    }
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
