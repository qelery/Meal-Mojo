import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthHttpInterceptor } from '../auth-http-interceptor/auth-http-interceptor.service';
import { mockAddress, mockRestaurantList } from '../../test/mock-data';
import { Restaurant } from '../../shared/model';
import { environment } from '@env';

describe('RestaurantService', () => {
  let restaurantService: RestaurantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthHttpInterceptor],
    });
    restaurantService = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(restaurantService).toBeTruthy();
  });

  it('should use the http service to get nearby restaurants', () => {
    restaurantService
      .getRestaurantsNearby(mockAddress)
      .subscribe((res: Restaurant[]) => {
        expect(res).toEqual(mockRestaurantList);
      });

    const req = httpMock.expectOne((httpReq) =>
      httpReq.url.includes(`${environment.restApiUrl}/restaurants/nearby`)
    );
    expect(req.request.method).toBe('GET');

    const params = req.request.params;
    expect(+params.get('distance')).toEqual(15);
    expect(+params.get('latitude')).toEqual(mockAddress.latitude);
    expect(+params.get('longitude')).toEqual(mockAddress.longitude);

    req.flush(mockRestaurantList);
  });

  it('should use the http service to get a restaurant by its id', () => {
    const id = 1;
    const expectedRestaurant = mockRestaurantList[0];

    restaurantService.getRestaurant(id).subscribe((res: Restaurant) => {
      expect(res).toEqual(expectedRestaurant);
    });

    const req = httpMock.expectOne(
      `${environment.restApiUrl}/restaurant/${id}`
    );
    expect(req.request.method).toBe('GET');

    req.flush(expectedRestaurant);
  });
});
