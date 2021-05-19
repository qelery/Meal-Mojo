import {Component, OnInit} from '@angular/core';
import { LocationService} from "../service/location/location.service";
import {OrderService} from "../service/order/order.service";

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.css']
})
export class AddressBarComponent implements OnInit {

  address: any;
  validAddressFound = true;
  addressForm: any;

  constructor(private locationService: LocationService, private orderService: OrderService) { }

  ngOnInit(): void {}

  processAddress(): void {
    if (!this.address || this.address.length < 10) {
      this.validAddressFound = false;
      return;
    }
    this.locationService.findAddress(this.address).subscribe((response: any) => {
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

         // If no street name (result is ambiguous) or multiple results returned (not specific enough)
         if (!streetName || response.results.length !== 1) {
           this.validAddressFound = false;
           return;
         }

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

         this.locationService.setCurrentAddress(addressDatabaseFormat, formattedAddress);
         this.validAddressFound = true;
          setTimeout(() => this.orderService.getRestaurantsNearUser(), 2000);
       }, err => console.log(err));

  }

}

