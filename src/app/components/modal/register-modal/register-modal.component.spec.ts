import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterModalComponent } from './register-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockRegisterRequest } from '@test/mock-data';
import { Subscription } from 'rxjs';
import { REGISTER_ERROR_MSG_409 } from '@store/auth-store/effects/auth.effects';
import { RootStoreState } from '@store';
import { AuthStoreActions, AuthStoreSelectors, AuthStoreState } from '@store/auth-store';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fixture: ComponentFixture<RegisterModalComponent>;
  let mockStore: MockStore;

  // TODO: Change the way this imports? REGISTER_ERROR_MSG_409
  const expectedError = REGISTER_ERROR_MSG_409;
  const expectedIsLoading = false;
  const mockState: RootStoreState.AppState = {
    ...RootStoreState.initialAppState,
    authState: {
      ...AuthStoreState.initialAuthState,
      userRegistrationState: {
        ...AuthStoreState.initialUserLoginState,
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
      AuthStoreActions.register({ registerRequest: mockRegisterRequest })
    );
  });

  it('should emit event to close modal when user completes registration', () => {
    spyOn(component.closeModalEmitter, 'emit');
    mockStore.overrideSelector(AuthStoreSelectors.selectUserIsLoggedIn, true);

    component.onSubmit();

    expect(component.closeModalEmitter.emit).toHaveBeenCalled();
  });

  it('should unsubscribe from all subscription on destroy', () => {
    component.isLoggedInSubscription = new Subscription();
    spyOn(component.isLoggedInSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.isLoggedInSubscription.unsubscribe).toHaveBeenCalled();
  });
});
