import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  RestaurantStoreActions,
  RestaurantStoreSelectors,
} from '@store/restaurant-store';
import { AddressStoreSelectors } from '@store/address-store';
import { Router } from '@angular/router';
import { Restaurant } from '@shared/model';
import { Observable } from 'rxjs';
import { LocationService } from '../../service/location/location.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent implements OnInit {
  currentAddress: string;
  heroImageUrl: string;
  nearbyRestaurants: Observable<Restaurant[]>;

  constructor(
    private locationService: LocationService,
    private readonly store: Store,
    private readonly router: Router
  ) {
    this.heroImageUrl = 'assets/image/store-front-hero-image.jpg';
  }

  ngOnInit(): void {
    this.store.select(AddressStoreSelectors.selectAddress).subscribe((address) => {
      if (address) {
        this.currentAddress = this.locationService.getFormattedAddressString(address);
        this.store.dispatch(RestaurantStoreActions.getNearbyRestaurants({ address }));
      } else {
        this.router.navigate(['/']);
      }
    });

    this.nearbyRestaurants = this.store.select<Restaurant[]>(
      RestaurantStoreSelectors.selectNearbyRestaurants
    );
  }
}
