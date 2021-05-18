import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../service/user.service";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";

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


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    [this.clickFunction, this.buttonText] = this.action === 'login' ? [this.loginUser, 'Log On'] : [this.registerUser, 'Register'];
  }

  hideSignInComponent() {
    this.notifyParent.emit();
  }

  loginUser() {
    console.log("LOGIN!!");
    const user = { email: this.email, password: this.password};
    this.userService.loginUser(user);
  }


  async registerUser() {
    console.log("REGISTER!!!");
    const user = { email: this.email, password: this.password};
    await this.userService.registerUser(user).toPromise().then(response => {
      console.log("Success");
    }).catch(err => {
      this.errorFeedback = err.error;
    })
  }
}
