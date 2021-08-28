import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { LoginRequest, LoginResponse } from '../../service/auth/model';
import { TokenStorageService } from '../../service/token-storage/token-storage.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements  OnInit {
  @Output() closeButtonClicked: EventEmitter<any> = new EventEmitter();
  loginRequestModel: LoginRequest = { username: '', password: '' };
  errorMessage: string;
  faTimes = faTimes;

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService,
    private readonly tokenStorage: TokenStorageService
  ) {}


  ngOnInit(): void {
    // this.store.select<string>()
    // getErrorMessage(error: HttpErrorResponse): string {
    //   if (error.status === 403) {
    //     return 'Invalid username or password.';
    //   } else {
    //     return 'Server Error. Please try again later.';
    //   }
    // }
  }

  hideSignInComponent(): void {
    this.closeButtonClicked.emit();
  }

  onSubmit(): void {

    this.authService.login(this.loginRequestModel).subscribe(
      (data: LoginResponse) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.userInfo);
      },
      (err) => {
        if (err.status === 403) {
          this.errorMessage = 'Invalid username or password.';
        } else {
          this.errorMessage = 'Server Error. Please try again later.';
        }
      }
    );
  }

}
