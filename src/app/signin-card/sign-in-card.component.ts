import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../service/user/user.service";
import {Router} from "@angular/router";
import {LocationService} from "../service/location/location.service";

@Component({
  selector: 'app-sign-in-card',
  templateUrl: './sign-in-card.component.html',
  styleUrls: ['./sign-in-card.component.css']
})
export class SignInCard implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() cardType: SignInCardType;
  email = '';
  password = '';
  buttonText = '';
  clickFunction: () => void;
  errorFeedback: string;
  greeting: string;

  constructor(private userService: UserService, private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    [this.clickFunction, this.buttonText, this.greeting] = this.cardType === SignInCardType.Login ?
                                                            [this.loginUser, 'Log On', 'Welcome back!'] :
                                                                                          [this.registerUser, 'Register', 'Ready to eat? Register Below!'];
  }

  hideSignInComponent(): void {
    this.notifyParent.emit();
  }

  loginUser(): void {
    const user = { email: this.email, password: this.password};
    this.userService.loginUser(user).subscribe((response: any) => {
      const token = response.jwt;
      localStorage.setItem('token', `${token}`);
      this.userService.setCurrentUser(user.email);
      this.hideSignInComponent();
      if (response.address.latitude && response.address.longitude) {
        const address = response.address;
        localStorage.setItem('latitude', `${address.latitude}`);
        localStorage.setItem('longitude', `${address.longitude}`);
        this.locationService.formattedAddress = `${address.street1}` + (address.street2 ? `, ${address.street2}` : '') +
          `, ${address.city}, ${address.state}`;
        this.locationService.formattedAddressSubject.next(this.locationService.formattedAddress);
        this.router.navigate(['']);
      }
    }, err => {
      this.errorFeedback = "Incorrect username or password";
    });
  }

  async registerUser(): Promise<void> {
    const user = { email: this.email, password: this.password};
    await this.userService.registerUser(user).toPromise().then(response => {
      this.hideSignInComponent();
      this.loginUser();
    }).catch(err => {
      this.errorFeedback = err.error;
    });
  }

  switchCardType(): void {
    if (this.cardType === SignInCardType.Register) {
      this.cardType = SignInCardType.Login;
    } else {
      this.cardType = SignInCardType.Register;
    }
    [this.clickFunction, this.buttonText, this.greeting] = this.cardType === SignInCardType.Login ?
                                                                [this.loginUser, 'Log On', 'Welcome back!'] :
                                                                      [this.registerUser, 'Register', 'Ready to eat? Register Below!'];
  }
}

export enum SignInCardType {
  Register,
  Login
}
