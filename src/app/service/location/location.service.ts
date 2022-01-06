import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Address, GoogleGeocoderAddressComponent, GooglePlaceResult } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {
    if (!environment.googleApiKey) {
      throw new Error(
        'You must provide your own Google API Key for the Meal Mojo app to work.' +
          'Please visit: https://developers.google.com/maps/documentation/geolocation/get-api-key to get an API key'
      );
    }
  }

  convertGooglePlaceResultToAddress(result: GooglePlaceResult): Address {
    const components = result.address_components;
    const address = this.parseGooglePlaceAddressComponents(components);
    address.latitude = result.geometry?.location?.lat();
    address.longitude = result.geometry?.location?.lng();
    return this.hasRequiredFields(address) ? address : null;
  }

  private parseGooglePlaceAddressComponents(
    components: GoogleGeocoderAddressComponent[]
  ): Address {
    const address = this.getAddressWithNullProps();

    let streetNumber = '';
    let streetRoute = '';

    for (const { types, short_name } of components) {
      const field = types[0];
      const value = short_name;
      switch (field) {
        case 'street_number':
          streetNumber = value;
          break;
        case 'route':
          streetRoute = value;
          break;
        case 'subpremise':
          address.street2 = value;
          break;
        case 'premise':
          address.street3 = value;
          break;
        case 'locality':
          address.city = value;
          break;
        case 'postal_code':
          address.zipcode = value;
          break;
        case 'administrative_area_level_1':
          address.state = value;
          break;
        case 'country':
          address.country = value;
          break;
      }
    }

    if (streetNumber && streetRoute) {
      address.street1 = `${streetNumber} ${streetRoute}`;
    }
    return address;
  }

  private hasRequiredFields(address: Address): boolean {
    for (const key in address) {
      if (key === 'street2' || key === 'street3') {
        continue;
      }
      if (address[key] === null) {
        return false;
      }
    }
    return true;
  }

  private getAddressWithNullProps(): Address {
    return {
      street1: null,
      street2: null,
      street3: null,
      city: null,
      state: null,
      zipcode: null,
      country: null,
      latitude: null,
      longitude: null,
    };
  }
}
