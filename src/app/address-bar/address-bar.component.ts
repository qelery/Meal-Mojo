import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.css']
})
export class AddressBarComponent implements OnInit {

  address: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  processAddress() {
    console.log("Clicked!!!");
  }
}
