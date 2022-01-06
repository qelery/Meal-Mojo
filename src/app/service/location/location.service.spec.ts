import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthHttpInterceptor } from '../auth-http-interceptor/auth-http-interceptor.service';
import { Address, GooglePlaceResult } from '../../shared/model';
import { mockGooglePlaceResults } from '../../test/mock-data';

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

  describe('When parsing Google Maps Geocoder response,', () => {
    it('should parse into Address objects', () => {
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
      let actualAddress = locationService.convertGooglePlaceResultToAddress(
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
      actualAddress = locationService.convertGooglePlaceResultToAddress(
        mockGooglePlaceResults[1]
      );
      expect(actualAddress).toEqual(expectedAddress);
    });

    it('should return null for address with no route or street number', () => {
      const placeResultNoRoute = removePropertyFromPlaceResult(
        mockGooglePlaceResults[0],
        'route'
      );

      let actualAddress =
        locationService.convertGooglePlaceResultToAddress(placeResultNoRoute);

      expect(actualAddress).toBeNull();

      const placeResultNoStreetNumber = removePropertyFromPlaceResult(
        mockGooglePlaceResults[1],
        'street_number'
      );

      actualAddress = locationService.convertGooglePlaceResultToAddress(
        placeResultNoStreetNumber
      );

      expect(actualAddress).toBeNull();
    });
  });

  const removePropertyFromPlaceResult = (
    placeResult: GooglePlaceResult,
    property: string
  ): GooglePlaceResult => {
    placeResult.address_components = placeResult.address_components.filter(
      (part) => !part.types.includes(property)
    );
    return placeResult;
  };
});
