import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../service/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in-card',
  templateUrl: './sign-in-card.component.html',
  styleUrls: ['./sign-in-card.component.css']
})
export class SignInCard implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() cardType: any;
  email = '';
  password = '';
  buttonText = '';
  clickFunction: any;
  errorFeedback: any;
  greeting: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    [this.clickFunction, this.buttonText, this.greeting] = this.cardType === SignInCardType.Login ?
                                                            [this.loginUser, 'Log On', 'Welcome back!'] :
                                                                                          [this.registerUser, 'Register', 'Ready to eat? Register Below!'];
  }

  hideSignInComponent() {
    this.notifyParent.emit();
  }

  loginUser() {
    const user = { email: this.email, password: this.password};
    this.userService.loginUser(user).subscribe((response: any) => {
      const token = response.jwt;
      localStorage.setItem('currentUser', `${user.email}`);
      localStorage.setItem('token', `${token}`);
      console.log(response, token);
      this.userService.setCurrentUser(user.email);
      this.hideSignInComponent();
      if (response.address.latitude && response.address.longitude) {
        localStorage.setItem('latitude', `${response.address.latitude}`);
        localStorage.setItem('longitude', `${response.address.longitude}`);
        this.router.navigate(['']);
      }

    }, err => {
      this.errorFeedback = "Incorrect username or password";
    });
  }

  async registerUser() {
    const user = { email: this.email, password: this.password};
    await this.userService.registerUser(user).toPromise().then(response => {
      this.hideSignInComponent();
      this.loginUser();
    }).catch(err => {
      this.errorFeedback = err.error;
    });
  }

  switchCardType() {
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
