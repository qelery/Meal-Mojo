import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistrationModal } from './login-registration-modal.component';

describe('SigninCardComponent', () => {
  let component: LoginRegistrationModal;
  let fixture: ComponentFixture<LoginRegistrationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegistrationModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistrationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
