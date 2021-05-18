import { Component, OnInit } from '@angular/core';
import { LocationService} from "../service/location.service";

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.css']
})
export class AddressBarComponent implements OnInit {

  address: string = '';

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
  }

  processAddress() {
    this.locationService.findAddress(this.address);
  }
}

