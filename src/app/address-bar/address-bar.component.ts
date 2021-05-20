import {Component, OnInit} from '@angular/core';
import { LocationService} from "../service/location/location.service";

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.css']
})
export class AddressBarComponent implements OnInit {

  address: any;
  validAddressFound = true;
  addressForm: any;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {}

  processAddress() {
    // Don't do an API call if use isn't specific
    if (!this.address || this.address.trim().length < 10) {
          this.validAddressFound = false;
          return;
    }
    this.locationService.processAddress(this.address);
    setTimeout(() => this.validAddressFound = false, 2000);
  }

}

