import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as AuthActions from '../../ngrx/actions/auth.action';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

fdescribe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let mockStore: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action to logout user on init', () => {
    spyOn(mockStore, 'dispatch');
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logoutUser());
  });

  it('should redirect to the home page', () => {
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
