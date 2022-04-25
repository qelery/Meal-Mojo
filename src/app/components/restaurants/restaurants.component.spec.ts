import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsComponent } from './restaurants.component';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BannerSmallComponent } from '../banner-small/banner-small.component';
import { AddressStoreSelectors } from '@store/address-store';
import { mockAddress, mockRestaurantList } from '@test/mock-data';
import {
  RestaurantStoreActions,
  RestaurantStoreSelectors,
} from '@store/restaurant-store';
import { RestaurantInfoCardComponent } from './restaurant-info-card/restaurant-info-card.component';

describe('RestaurantsComponent', () => {
  let component: RestaurantsComponent;
  let fixture: ComponentFixture<RestaurantsComponent>;
  let router: Router;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BannerSmallComponent,
        RestaurantsComponent,
        RestaurantInfoCardComponent,
      ],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();
    router = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select nearby restaurants from the store', () => {
    mockStore.overrideSelector(
      RestaurantStoreSelectors.selectNearbyRestaurants,
      mockRestaurantList
    );

    component.nearbyRestaurants.subscribe((restaurants) => {
      expect(restaurants).toBe(mockRestaurantList);
    });
  });

  describe('When address is in state', () => {
    it('should dispatch action to get nearby restaurants', () => {
      mockStore.overrideSelector(AddressStoreSelectors.selectAddress, mockAddress);

      component.ngOnInit();

      mockStore.scannedActions$.subscribe((action) => {
        expect(action).toEqual(
          RestaurantStoreActions.getNearbyRestaurants({ address: mockAddress })
        );
      });
    });
  });

  describe('When no address in state', () => {
    it('should redirect to homepage', () => {
      const routerNavigateSpy = spyOn(router, 'navigate');
      mockStore.overrideSelector(AddressStoreSelectors.selectAddress, null);

      component.ngOnInit();

      expect(routerNavigateSpy).toHaveBeenCalledOnceWith(['/']);
    });
  });
});
