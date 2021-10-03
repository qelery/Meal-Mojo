import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginModalComponent } from './login-modal.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, initialAppState } from '../../../ngrx/state/app.state';
import {
  initialAuthState,
  initialUserLoginState,
} from '../../../ngrx/reducers/auth.reducer';
import { FormsModule } from '@angular/forms';
import { LOGIN_ERROR_MSG_403 } from '../../../ngrx/effects/auth.effects';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import * as AuthActions from '../../../ngrx/actions/auth.action';
import { mockLoginRequest } from '../../../test/mock-data';

fdescribe('LoginModal', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
  let mockStore: MockStore;

  const expectedError = LOGIN_ERROR_MSG_403;
  const expectedIsLoading = false;
  const mockState: AppState = {
    ...initialAppState,
    authState: {
      ...initialAuthState,
      userLoginState: {
        ...initialUserLoginState,
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
      AuthActions.loginUser({ loginRequest: mockLoginRequest })
    );
  });
});
