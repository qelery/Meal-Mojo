import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginRequest } from '../../service/auth/model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import {
  selectLoginError,
  selectLoginIsLoading,
} from '../../ngrx/selectors/auth.selector';
import * as AuthActionTypes from '../../ngrx/actions/auth.action';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';
import { User } from '../../shared/model';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  faTimes = faTimes;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  loginRequestModel: LoginRequest = { username: '', password: '' };
  @Output() closeModalEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly store: Store,
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.error$ = this.store.select<string>(selectLoginError);
    this.isLoading$ = this.store.select<boolean>(selectLoginIsLoading);
  }

  hideLoginComponent(): void {
    this.closeModalEmitter.emit();
  }

  onSubmit(): void {
    const loginRequest = { ...this.loginRequestModel };
    this.store.dispatch(AuthActionTypes.loginUser({ loginRequest }));

    this.localStorageService.userSubject.subscribe((user: User) => {
      if (user) {
        this.hideLoginComponent();
      }
    });
  }
}
