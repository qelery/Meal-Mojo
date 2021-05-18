import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentAddress!: CurrentAddress;
  searchSubject = new Subject();

  constructor(private http: HttpClient) {
    if (!environment.googleApiKey) {
      throw new Error("You must provide your own Google API Key for the Meal Mojo app to work." +
        "Please visit: https://developers.google.com/maps/documentation/geolocation/get-api-key to get an API key\"");
    }
  }

  findAddress(userEnteredAddress: string): void {
    console.log("Fetching address....");
    this.http.get(this.formatGoogleApiLink(userEnteredAddress)).toPromise().then((response: any) => {
      const components = response.results[0]['address_components'];
      const geometry = response.results[0]['geometry'];

      console.log(response)
      let subpremise = '';
      let streetNumber = '';
      let streetName = '';
      let state = '';
      let zipcode = '';
      let city = '';

      components.forEach((part: any) => {
        if (part.types.includes("subpremise")) {
          subpremise = part['long_name'];
        } else if (part.types.includes("street_number")) {
          streetNumber = part['long_name'];
        } else if (part.types.includes("route")) {
          streetName = part['long_name'];
        } else if (part.types.includes("administrative_area_level_1")) {
          state = part['short_name'];
        } else if (part.types.includes("postal_code")) {
          zipcode = part['long_name'];
        } else if (part.types.includes("locality")) {
          city = part['long_name'];
        }
      });

      const street1 = `${streetNumber} ${streetName}`;
      const street2 = subpremise || null;

      const longitude = geometry.location['lng'];
      const latitude = geometry.location['lat'];

      const addressDatabaseFormat = {
        street1: street1,
        street2: street2,
        city: city,
        zipcode: zipcode,
        state: state,
        latitude: latitude,
        longitude: longitude
      }

      const formattedAddress = `${street1}` + (street2 ? `, ${street2}` : '') + `, ${city}, ${state}`;

      this.currentAddress = {...addressDatabaseFormat, ...{formattedAddress: formattedAddress}};
      localStorage.setItem('currentAddress', `${this.currentAddress}`);
      this.searchSubject.next(this.currentAddress);
      if (localStorage.getItem('currentUser')) {
        this.saveAddressToDatabase(addressDatabaseFormat);
      }
    }, err => console.log(err));
  }

  formatGoogleApiLink(address: string): string {
    const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
    return `${baseUrl}${address}&key=${environment.googleApiKey}`;
  }

  private saveAddressToDatabase(addressDatabaseFormat: any): any {
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
