import { Component } from '@angular/core';
import { LocationService } from '../../service/location/location.service';
import { faArrowAltCircleRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Address, GooglePlaceResult } from '@shared/model';
import { Store } from '@ngrx/store';
import { AddressStoreActions, AddressStoreSelectors } from '@store/address-store';
import { combineLatest, skipWhile, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.css'],
})
export class AddressBarComponent {
  arrowAltCircleRight = faArrowAltCircleRight;
  mapMarkerAlt = faMapMarkerAlt;
  address: Address;

  constructor(
    private readonly store: Store,
    private readonly locationService: LocationService,
    private readonly router: Router
  ) {}

  handleAddressBarPlaceChanged(place: GooglePlaceResult) {
    this.address = this.locationService.convertGooglePlaceToAddress(place);
  }

  submitAddress(): void {
    if (!this.address) {
      return;
    }
    this.store.dispatch(AddressStoreActions.updateAddress({ address: this.address }));
    this.redirectOnAddressUpdateSuccess();
  }

  private redirectOnAddressUpdateSuccess(): void {
    combineLatest([
      this.store.select<string>(AddressStoreSelectors.selectAddressError),
      this.store.select<boolean>(AddressStoreSelectors.selectAddressIsLoading),
    ])
      .pipe(
        map(([error, isLoading]) => ({ error, isLoading })),
        skipWhile(({ isLoading }) => isLoading === true),
        take(1)
      )
      .subscribe(({ error }): void => {
        if (!error) {
          this.router.navigate(['/restaurants']);
        }
      });
  }
}
