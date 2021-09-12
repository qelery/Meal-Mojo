import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import {
  selectLoginError,
  selectLoginIsLoading,
} from '../../../ngrx/selectors/auth.selector';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { nameValidator } from '../../../shared/custom-validators/name-name-async-validator/name-async-validator.directive';

const REGEX_NUMBER_OR_UPPERCASE = '^(?=.*[A-Z0-9]).*$';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
  faTimes = faTimes;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  registrationForm = this.fb.group({
    firstName: ['', Validators.required, nameValidator()],
    lastName: [null, Validators.required, nameValidator()],
    email: ['', { updateOn: 'blur', validators: [Validators.email] }],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(REGEX_NUMBER_OR_UPPERCASE),
      ],
    ],
    confirmPass: ['', [Validators.required]],
  });
  pageOneVisible = true;
  pageTwoVisible = false;
  pwReqOneMet = false;
  pwReqTwoMet = false;
  pwReqThreeMet = false;
  @Output() closeModalEmitter: EventEmitter<any> = new EventEmitter();
  @Output() switchModalEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.error$ = this.store.select<string>(selectLoginError);
    this.isLoading$ = this.store.select<boolean>(selectLoginIsLoading);
  }

  showPageTwo(): void {
    this.pageOneVisible = false;
    this.pageTwoVisible = true;
  }

  hideRegisterComponent(): void {
    this.closeModalEmitter.emit();
  }

  onSubmit(): void {
  }

  switchModal(): void {
    this.switchModalEmitter.emit();
  }

  checkPasswordRequirements(): void {
    this.pwReqOneMet = false;
    this.pwReqTwoMet = false;
    this.pwReqThreeMet = false;

    this.registrationForm.updateValueAndValidity();

    if (this.registrationForm.get('password').errors?.required) {
      return;
    }

    this.pwReqOneMet = !this.registrationForm.get('password').errors?.minlength;
    this.pwReqTwoMet = !this.registrationForm.get('password').errors?.pattern;
    this.pwReqThreeMet =
      this.registrationForm.get('password').value ===
      this.registrationForm.get('confirmPass').value;
  }
}
