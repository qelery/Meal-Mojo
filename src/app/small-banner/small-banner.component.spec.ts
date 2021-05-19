import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBannerComponent } from './small-banner.component';

describe('RestaurantStoreFrontBannerComponent', () => {
  let component: SmallBannerComponent;
  let fixture: ComponentFixture<SmallBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
