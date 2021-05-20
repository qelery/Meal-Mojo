import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentAddress: any;
  searchSubject = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    if (!environment.googleApiKey) {
      throw new Error("You must provide your own Google API Key for the Meal Mojo app to work." +
        "Please visit: https://developers.google.com/maps/documentation/geolocation/get-api-key to get an API key\"");
    }
  }

  findAddress(userEnteredAddress: string): Observable<any> {
    return this.http.get(this.formatGoogleApiLink(userEnteredAddress));
  }

  formatGoogleApiLink(address: string): string {
    const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
    return `${baseUrl}${address}&key=${environment.googleApiKey}`;
  }

  setUserCurrentAddress(addressDatabaseFormat: any, formattedAddress: any) {
    this.currentAddress = {...addressDatabaseFormat, ...{formattedAddress: formattedAddress}};
    this.searchSubject.next(this.currentAddress);
    localStorage.setItem('currentAddress', `${formattedAddress}`);
    localStorage.setItem('longitude', `${this.currentAddress.longitude}`);
    localStorage.setItem('latitude', `${this.currentAddress.latitude}`);
    if (localStorage.getItem('currentUser')) {
      this.saveAddressToDatabase(addressDatabaseFormat);
    }
  }

  getUserCurrentAddress(): any {
    return [localStorage.getItem('longitude'), localStorage.getItem('latitude')];
  }

  saveAddressToDatabase(addressDatabaseFormat: any): any {
    console.log("saving to database...")
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    this.http.put(`${environment.restApiUrl}/auth/users/update`, {address: addressDatabaseFormat}, requestOptions);

  }
}

export interface CurrentAddress {
  "street1": string;
  "street2": string | null;
  "city": string;
  "zipcode": string;
  "state": string;
  "latitude": number;
  "longitude": number;
  "formattedAddress": string;
}
