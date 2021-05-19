import {Component, OnChanges, OnInit} from '@angular/core';
import {UserService} from "../service/user/user.service";
import {LocationService} from "../service/location/location.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showRegisterCard: boolean;
  showLoginCard: boolean;
  isUserLoggedIn: any;
  currentAddress: any;

  constructor(private userService: UserService, private  locationService: LocationService) {
    this.showRegisterCard = false;
    this.showLoginCard = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isUserLoggedIn = true;
      return;
    }
    console.log("Current address is...")
    console.log(this.currentAddress)
    this.userService.searchSubject.subscribe(currentUser => {
      this.isUserLoggedIn = !!currentUser;
      console.log(currentUser);
    });
    this.locationService.searchSubject.subscribe(currentAddress => {
      this.currentAddress = currentAddress;
      console.log(currentAddress);
    })
  }

  showRegister() {
    this.showRegisterCard = true;
    console.log(this.currentAddress);
  }

  showLogIn() {
    this.showLoginCard = true;
  }

  hideSignInComponent() {
    this.showRegisterCard = false;
    this.showLoginCard = false;
  }
}
