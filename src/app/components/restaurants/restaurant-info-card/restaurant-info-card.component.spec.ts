import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantInfoCardComponent } from './restaurant-info-card.component';
import { mockRestaurantList } from '@test/mock-data';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('RestaurantInfoCardComponent', () => {
  let component: RestaurantInfoCardComponent;
  let fixture: ComponentFixture<RestaurantInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantInfoCardComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantInfoCardComponent);
    component = fixture.componentInstance;
    component.restaurant = mockRestaurantList[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
