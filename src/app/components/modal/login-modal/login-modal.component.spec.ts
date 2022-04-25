import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginModalComponent } from './login-modal.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { mockLoginRequest } from '@test/mock-data';
import { LOGIN_ERROR_MSG_403 } from '@store/auth-store/effects/auth.effects';
import { RootStoreState } from '@store';
import { AuthStoreActions, AuthStoreState } from '@store/auth-store';

describe('LoginModal', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
  let mockStore: MockStore;

  // TODO: Change how this imports? LOGIN_ERROR_MSG_403
  const expectedError = LOGIN_ERROR_MSG_403;
  const expectedIsLoading = false;
  const mockState: RootStoreState.AppState = {
    ...RootStoreState.initialAppState,
    authState: {
      ...AuthStoreState.initialAuthState,
      userLoginState: {
        ...AuthStoreState.initialUserLoginState,
        isLoading: expectedIsLoading,
        error: expectedError,
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginModalComponent],
      imports: [FormsModule, FontAwesomeTestingModule],
      providers: [provideMockStore({ initialState: mockState })],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select login error message from the store', () => {
    component.error$.subscribe((error) => {
      expect(error).toEqual(expectedError);
    });
  });

  it('should select loginIsLoading state from the store', () => {
    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toEqual(expectedIsLoading);
    });
  });

  it('should emit event to hide component when close button clicked', () => {
    spyOn(component.closeModalEmitter, 'emit');
    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(component.closeModalEmitter.emit).toHaveBeenCalled();
  });

  it('should emit event to other auth modal when go to register link clicked', () => {
    spyOn(component.switchModalEmitter, 'emit');
    const goToRegisterLink = fixture.nativeElement.querySelector(
      '[data-cy="login-switch-to-register"]'
    );
    goToRegisterLink.click();
    expect(component.switchModalEmitter.emit).toHaveBeenCalled();
  });

  it('should dispatch an action to login user on submit', () => {
    spyOn(mockStore, 'dispatch');
    component.loginRequestModel = mockLoginRequest;
    component.onSubmit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AuthStoreActions.login({ loginRequest: mockLoginRequest })
    );
  });
});
