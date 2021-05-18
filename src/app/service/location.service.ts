import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentAddress!: CurrentAddress;

  constructor(private http: HttpClient) {
    if (!environment.googleApiKey) {
        throw new Error("You must provide your own Google API Key for the Meal Mojo app to work." +
          "Please visit: https://developers.google.com/maps/documentation/geolocation/get-api-key to get an API key\"");
    }
  }

  findAddress(userEnteredAddress: string): void {
    console.log("HERE")
   this.http.get(this.formatApiLink(userEnteredAddress)).toPromise().then((response: any) => {
     const components = response.results[0]['address_components'];
     const geometry = response.results[0]['geometry'];
     const formattedAddress = response.results[0]['formatted_address'];
     console.log(geometry)
     console.log(formattedAddress)
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
         streetNumber = part['long_name'];
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

     this.currentAddress = {
       street1: street1,
       street2: street2,
       city: city,
       zipcode: zipcode,
       state: state,
       latitude: latitude,
       longitude: longitude,
       formattedAddress: formattedAddress
     }
     console.log(this.currentAddress);
   });
  }

  formatApiLink(address: string) {
    const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=`;
    return `${baseUrl}${address}&key=${environment.googleApiKey}`;
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
