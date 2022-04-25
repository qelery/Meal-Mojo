import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthHttpInterceptor } from '../auth-http-interceptor/auth-http-interceptor.service';
import { Address, GooglePlaceResult } from '@shared/model';
import { mockGooglePlaceResults } from '@test/mock-data';

describe('LocationService', () => {
  let locationService: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthHttpInterceptor],
    });
    locationService = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(locationService).toBeTruthy();
  });

  describe('When getting a street address string from a Address object', () => {
    it('should return formatted street address for valid address', () => {
      const address = {
        street1: '5700 S Lake Shore Dr',
        street2: 'Building A',
        street3: 'Suite #123',
        city: 'Chicago',
        state: 'IL',
        zipcode: '60637',
        country: 'US',
        latitude: 41.7905726,
        longitude: -87.5830659,
      };
      let expectedFormattedAddress =
        '5700 S Lake Shore Dr, Building A, Suite #123, Chicago, IL';

      let actualFormattedAddress = locationService.getFormattedAddressString(address);
      expect(actualFormattedAddress).toEqual(expectedFormattedAddress);

      address.street2 = null;
      expectedFormattedAddress = '5700 S Lake Shore Dr, Suite #123, Chicago, IL';

      actualFormattedAddress = locationService.getFormattedAddressString(address);
      expect(actualFormattedAddress).toEqual(expectedFormattedAddress);

      address.street2 = null;
      address.street3 = null;
      expectedFormattedAddress = '5700 S Lake Shore Dr, Chicago, IL';

      actualFormattedAddress = locationService.getFormattedAddressString(address);
      expect(actualFormattedAddress).toEqual(expectedFormattedAddress);
    });

    it(`should return 'Invalid address.' for an address missing the street1 property`, () => {
      const address = {
        street1: null,
        street2: 'Building A',
        street3: 'Suite ABC',
        city: 'Chicago',
        state: 'IL',
        zipcode: '60637',
        country: 'US',
        latitude: 41.7905726,
        longitude: -87.5830659,
      };

      const formattedAddress = locationService.getFormattedAddressString(address);

      expect(formattedAddress).toEqual('Invalid address.');
    });
  });

  describe('When converting GooglePlaceResult,', () => {
    it('should return Address type object', () => {
      let expectedAddress: Address = {
        street1: '2207 N Clybourn Ave',
        street2: null,
        street3: null,
        city: 'Chicago',
        state: 'IL',
        zipcode: '60614',
        country: 'US',
        latitude: 41.92194509999999,
        longitude: -87.66435779999999,
      };
      let actualAddress = locationService.convertGooglePlaceToAddress(
        mockGooglePlaceResults[0]
      );
      expect(actualAddress).toEqual(expectedAddress);

      expectedAddress = {
        street1: '2301 S Martin Luther King Dr',
        street2: '#3A',
        street3: 'McCormick Place',
        city: 'Chicago',
        state: 'IL',
        zipcode: '60616',
        country: 'US',
        latitude: 41.8507079,
        longitude: -87.6161478,
      };
      actualAddress = locationService.convertGooglePlaceToAddress(
        mockGooglePlaceResults[1]
      );
      expect(actualAddress).toEqual(expectedAddress);
    });

    it('should return if no route or street number present', () => {
      const placeResultNoRoute = removePropertyFromPlaceResult(
        mockGooglePlaceResults[0],
        'route'
      );

      let actualAddress = locationService.convertGooglePlaceToAddress(placeResultNoRoute);

      expect(actualAddress).toBeNull();

      const placeResultNoStreetNumber = removePropertyFromPlaceResult(
        mockGooglePlaceResults[1],
        'street_number'
      );

      actualAddress = locationService.convertGooglePlaceToAddress(
        placeResultNoStreetNumber
      );

      expect(actualAddress).toBeNull();
    });
  });

  function removePropertyFromPlaceResult(
    placeResult: GooglePlaceResult,
    property: string
  ): GooglePlaceResult {
    placeResult.address_components = placeResult.address_components.filter(
      (part) => !part.types.includes(property)
    );
    return placeResult;
  }
});
