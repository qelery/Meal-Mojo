import { Injectable } from '@angular/core';
import { Address, Restaurant } from '../../shared/model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private readonly http: HttpClient) {}

  getRestaurantsNearby(address: Address): Observable<Restaurant[]> {
    const params = {
      distance: 15,
      latitude: address.latitude,
      longitude: address.longitude,
    };
    return this.http.get<Restaurant[]>(
      `${environment.restApiUrl}/restaurants/nearby`,
      { params }
    );
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(
      `${environment.restApiUrl}/restaurant/${id}`
    );
  }
}
