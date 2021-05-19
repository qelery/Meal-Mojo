import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantStoreFrontBannerComponent } from './restaurant-store-front-banner.component';

describe('RestaurantStoreFrontBannerComponent', () => {
  let component: RestaurantStoreFrontBannerComponent;
  let fixture: ComponentFixture<RestaurantStoreFrontBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantStoreFrontBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantStoreFrontBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
