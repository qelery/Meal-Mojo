import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpMethod } from './helpers/http-methods.helper';

const { GET, POST, PUT, PATCH, DELETE } = HttpMethod;

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  apiUrl = `${environment.restApiUrl}`;

  constructor(private readonly http: HttpClient) {}

  public perform<T>(
    method: HttpMethod,
    route: string,
    body?: any
  ): Observable<T> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const url = `${this.apiUrl}${route}`;
    let response$: Observable<T>;

    switch (method) {
      case GET:
      case DELETE:
        response$ = this.http[method]<T>(url, headers);
        break;
      case POST:
      case PUT:
      case PATCH:
        if (body === null) {
          throw new Error(
            'Body parameter cannot be null on POST, PUT, or PATCH requests.'
          );
        }
        response$ = this.http[method]<T>(url, body, headers);
        break;
      default:
        throw new Error(`HTTP method ${method} has not been implemented.`);
    }

    return response$.pipe(share());
  }
}
