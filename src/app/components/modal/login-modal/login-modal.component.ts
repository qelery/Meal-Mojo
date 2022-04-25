import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginRequest, User } from '@shared/model';
import { AuthStoreActions, AuthStoreSelectors } from '@store/auth-store';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  faTimes = faTimes;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  // TODO: Change this?
  loginRequestModel: LoginRequest = { username: '', password: '' };
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() switchModalEmitter = new EventEmitter<void>();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.error$ = this.store.select<string>(AuthStoreSelectors.selectLoginError);
    this.isLoading$ = this.store.select<boolean>(AuthStoreSelectors.selectLoginIsLoading);
  }

  hideModal(): void {
    this.closeModalEmitter.emit();
  }

  switchToRegisterModal(): void {
    this.switchModalEmitter.emit();
  }

  onSubmit(): void {
    const loginRequest = { ...this.loginRequestModel };
    this.store.dispatch(AuthStoreActions.login({ loginRequest }));

    // eslint-disable-next-line ngrx/no-store-subscription
    this.store.select(AuthStoreSelectors.selectUser).subscribe((user: User) => {
      if (user) {
        this.hideModal();
      }
    });
  }
}
