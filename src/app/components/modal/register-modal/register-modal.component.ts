import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { nameValidator } from '@shared/custom-validators/name-async-validator/name-async-validator.directive';
import { RegisterRequest, Role } from '@shared/model';
import { sameValueValidator } from '@shared/custom-validators/same-value-validator/same-value-validator.directive';
import { AuthStoreActions, AuthStoreSelectors } from '@store/auth-store';

const REGEX_NUMBER_OR_UPPERCASE_OR_SPECIAL_CHARACTER =
  '^(?=.*[A-Z0-9*A-Z0-9*$@!#%&()^~{}\\-_+=]).*$';
const MIN_PASS_LEN = 6;

// TODO: Handle username already exists
// TODO: Handle server error
// TODO: Need unit tests for this component
// TODO: Close button on modals hard to click

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  isLoggedInSubscription: Subscription;
  registrationForm = this.fb.group(
    {
      firstName: ['', Validators.required, nameValidator()],
      lastName: ['', Validators.required, nameValidator()],
      email: ['', { updateOn: 'blur', validators: [Validators.email] }],
      password: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(MIN_PASS_LEN),
            Validators.pattern(REGEX_NUMBER_OR_UPPERCASE_OR_SPECIAL_CHARACTER),
          ],
        },
      ],
      confirmPassword: [''],
    },
    { validators: sameValueValidator('password', 'confirmPassword') }
  );

  pageOneVisible = true;
  pageTwoVisible = false;

  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() switchModalEmitter = new EventEmitter<void>();

  constructor(private readonly store: Store, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.error$ = this.store.select<string>(AuthStoreSelectors.selectRegisterError);
    this.isLoading$ = this.store.select<boolean>(
      AuthStoreSelectors.selectRegisterIsLoading
    );
  }

  showPageTwo(): void {
    this.pageOneVisible = false;
    this.pageTwoVisible = true;
  }

  hideModal(): void {
    this.closeModalEmitter.emit();
  }

  switchModalToLoginModal(): void {
    this.switchModalEmitter.emit();
  }

  onSubmit(): void {
    // TODO: Change AUthStoreState part
    const registerRequest: RegisterRequest = {
      firstName: this.registrationForm.get('firstName').value,
      lastName: this.registrationForm.get('lastName').value,
      email: this.registrationForm.get('email').value,
      password: this.registrationForm.get('password').value,
      role: Role.CUSTOMER,
    };

    this.store.dispatch(AuthStoreActions.register({ registerRequest }));

    this.isLoggedInSubscription = this.store
      .select<boolean>(AuthStoreSelectors.selectUserIsLoggedIn)
      // eslint-disable-next-line ngrx/no-store-subscription
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.hideModal();
        }
      });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription?.unsubscribe();
  }
}
