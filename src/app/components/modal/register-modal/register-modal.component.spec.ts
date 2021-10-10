import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterModalComponent } from './register-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from '../../../ngrx/state/app.state';
import {
  initialAuthState,
  initialUserLoginState,
} from '../../../ngrx/reducers/auth.reducer';
import { REGISTER_ERROR_MSG_409 } from '../../../ngrx/effects/auth.effects';
import { mockRegisterRequest } from '../../../test/mock-data';
import * as AuthActions from '../../../ngrx/actions/auth.action';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fixture: ComponentFixture<RegisterModalComponent>;
  let mockStore: MockStore;

  const expectedError = REGISTER_ERROR_MSG_409;
  const expectedIsLoading = false;
  const mockState: AppState = {
    ...initialAppState,
    authState: {
      ...initialAuthState,
      userRegistrationState: {
        ...initialUserLoginState,
        isLoading: expectedIsLoading,
        error: expectedError,
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterModalComponent],
      imports: [FormsModule, ReactiveFormsModule, FontAwesomeTestingModule],
      providers: [provideMockStore({ initialState: mockState })],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select registerError from the store', () => {
    component.error$.subscribe((error) => {
      expect(error).toEqual(expectedError);
    });
  });

  it('should select registerIsLoading state from the store', () => {
    component.isLoading$.subscribe((error) => {
      expect(error).toEqual(expectedIsLoading);
    });
  });

  it('should emit event to hide component when close button clicked', () => {
    spyOn(component.closeModalEmitter, 'emit');
    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(component.closeModalEmitter.emit).toHaveBeenCalled();
  });

  it('should emit event to switch to other auth modal when go to login link clicked', () => {
    spyOn(component.switchModalEmitter, 'emit');
    const goToRegisterLink = fixture.nativeElement.querySelector(
      '[data-cy="register-switch-to-login"]'
    );
    goToRegisterLink.click();
    expect(component.switchModalEmitter.emit).toHaveBeenCalled();
  });

  it('should dispatch an action to register user on submit', () => {
    spyOn(mockStore, 'dispatch');
    component.registrationForm.setValue({
      firstName: mockRegisterRequest.firstName,
      lastName: mockRegisterRequest.lastName,
      email: mockRegisterRequest.email,
      password: mockRegisterRequest.password,
      confirmPassword: mockRegisterRequest.password,
    });

    component.onSubmit();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AuthActions.registerUser({ registerRequest: mockRegisterRequest })
    );
  });
});
