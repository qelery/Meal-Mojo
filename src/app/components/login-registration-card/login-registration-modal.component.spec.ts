import { ComponentFixture, TestBed } from '@angular/core/testing';
import {LoginRegistrationModalComponent} from "./login-registration-modal.component";

describe('LoginRegistrationModal', () => {
  let component: LoginRegistrationModalComponent;
  let fixture: ComponentFixture<LoginRegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegistrationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
