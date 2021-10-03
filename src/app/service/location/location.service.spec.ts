import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { Address, GoogleGeocoderResponse } from '../../shared/model';

fdescribe('LocationService', () => {
  let locationService: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    locationService = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(locationService).toBeTruthy();
  });

  it('should use Google Maps api to turn a string query into a complete address', () => {
    const addressQuery = '111 michigan ave chicago';
    locationService
      .findAddress(addressQuery)
      .subscribe((res: any) => console.log());
    fail();
  });

  it('should parse a Google Maps Geocode response into an Address object', () => {
    const geocodeResult: GoogleGeocoderResponse = {
      results: [
        {
          address_components: [
            {
              long_name: '111',
              short_name: '111',
              types: ['street_number'],
            },
            {
              long_name: 'Michigan Avenue',
              short_name: 'Michigan Ave',
              types: ['route'],
            },
            {
              long_name: 'Chicago Loop',
              short_name: 'Chicago Loop',
              types: ['neighborhood', 'political'],
            },
            {
              long_name: 'Chicago',
              short_name: 'Chicago',
              types: ['locality', 'political'],
            },
            {
              long_name: 'Cook County',
              short_name: 'Cook County',
              types: ['administrative_area_level_2', 'political'],
            },
            {
              long_name: 'Illinois',
              short_name: 'IL',
              types: ['administrative_area_level_1', 'political'],
            },
            {
              long_name: 'United States',
              short_name: 'US',
              types: ['country', 'political'],
            },
            {
              long_name: '60603',
              short_name: '60603',
              types: ['postal_code'],
            },
          ],
          formatted_address: '111 Michigan Ave, Chicago, IL 60603, USA',
          geometry: {
            location: {
              lat: 41.8795419,
              lng: -87.62391,
            },
            location_type: 'ROOFTOP',
            viewport: {
              northeast: {
                lat: 41.8808908802915,
                lng: -87.6225610197085,
              },
              southwest: {
                lat: 41.8781929197085,
                lng: -87.62525898029151,
              },
            },
          },
          partial_match: true,
          place_id: 'ChIJQQlJ76MsDogRcfIdK0uWKCY',
          plus_code: {
            compound_code: 'V9HG+RC Chicago, IL, USA',
            global_code: '86HJV9HG+RC',
          },
          types: ['street_address'],
        },
      ],
      status: 'OK',
    };
  });
});
