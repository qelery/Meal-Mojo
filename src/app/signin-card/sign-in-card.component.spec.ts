import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInCard } from './sign-in-card.component';

describe('SigninCardComponent', () => {
  let component: SignInCard;
  let fixture: ComponentFixture<SignInCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInCard ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
