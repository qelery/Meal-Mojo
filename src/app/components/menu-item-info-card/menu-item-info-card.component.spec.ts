import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemInfoCardComponent } from './menu-item-info-card.component';

describe('MenuItemInfoCardComponent', () => {
  let component: MenuItemInfoCardComponent;
  let fixture: ComponentFixture<MenuItemInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
