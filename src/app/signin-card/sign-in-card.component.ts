import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-sign-in-card',
  templateUrl: './sign-in-card.component.html',
  styleUrls: ['./sign-in-card.component.css']
})
export class SignInCard implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  email = '';
  password = '';
  buttonText = '';
  @Input() action: any;
  clickFunction: any;
  errorFeedback: any;
  greeting: any;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    [this.clickFunction, this.buttonText, this.greeting] = this.action === 'login' ?
                                                            [this.loginUser, 'Log On', 'Welcome back!'] :
                                                                                          [this.registerUser, 'Register', 'Ready to eat?'];
  }

  hideSignInComponent() {
    this.notifyParent.emit();
  }

  loginUser() {
    console.log("LOGIN");
    const user = { email: this.email, password: this.password};
    this.userService.loginUser(user).subscribe((response: any) => {
      const token = response.jwt;
      localStorage.setItem('currentUser', `${user.email}`);
      localStorage.setItem('token', `${token}`);
      console.log(response, token);
      this.userService.setCurrentUser(user.email);
      this.hideSignInComponent();
    }, err => {
      this.errorFeedback = "Incorrect username or password";
    });
  }

  async registerUser() {
    console.log("REGISTER");
    const user = { email: this.email, password: this.password};
    await this.userService.registerUser(user).toPromise().then(response => {
      console.log("Success");
      this.hideSignInComponent();
      this.loginUser();
    }).catch(err => {
      this.errorFeedback = err.error;
    });
  }
}
