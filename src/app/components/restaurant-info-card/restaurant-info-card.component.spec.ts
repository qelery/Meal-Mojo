import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantInfoCardComponent } from './restaurant-info-card.component';

describe('RestaurantInfoCardComponent', () => {
  let component: RestaurantInfoCardComponent;
  let fixture: ComponentFixture<RestaurantInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
