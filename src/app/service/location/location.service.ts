import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  formattedAddressSubject = new BehaviorSubject(null);
  userCoordinatesSubject = new BehaviorSubject(null);
  userCoordinates: any;
  formattedAddress: any;

  constructor(private http: HttpClient, private router: Router) {
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

  setUserCurrentAddress(fullAddress: any, formattedAddress: any) {
    this.formattedAddress = formattedAddress;
    console.log("Setting address");
    this.formattedAddressSubject.next(this.formattedAddress);
    this.userCoordinates = {longitude: fullAddress.longitude, latitude: fullAddress.latitude};
    localStorage.setItem('currentAddress', `${formattedAddress}`);
    localStorage.setItem('longitude', `${fullAddress.longitude}`);
    localStorage.setItem('latitude', `${fullAddress.latitude}`);
    if (localStorage.getItem('currentUser')) {
      this.saveToDatabase(fullAddress);
    }
  }

  getUserCurrentAddress(): any {
    return [localStorage.getItem('longitude'), localStorage.getItem('latitude')];
  }

  saveToDatabase(addressDatabaseFormat: any): any {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    this.http.put(`${environment.restApiUrl}/auth/users/update`, {address: addressDatabaseFormat}, requestOptions);
  }

  processAddress(address: string): void {
    this.findAddress(address).subscribe((response: any) => {
      const components = response.results[0]['address_components'];
      const geometry = response.results[0]['geometry'];
      console.log(address)
      console.log(response)
      console.log("HERE....")

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

      // If no street name (result is ambiguous) or multiple results returned (not specific enough)
      if (!streetName || response.results.length !== 1) {
        return;
      }

      const street1 = `${streetNumber} ${streetName}`;
      const street2 = subpremise || null;

      const longitude = geometry.location['lng'];
      const latitude = geometry.location['lat'];

      const fullAddress = {
        street1: street1,
        street2: street2,
        city: city,
        zipcode: zipcode,
        state: state,
        latitude: latitude,
        longitude: longitude
      }

      const formattedAddress = `${street1}` + (street2 ? `, ${street2}` : '') + `, ${city}, ${state}`;

      this.setUserCurrentAddress(fullAddress, formattedAddress);
      this.router.navigate(['/restaurants'])
    }, err => console.log(err));
  }
}
