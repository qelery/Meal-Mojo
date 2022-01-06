import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { LocationService } from '../../service/location/location.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements AfterViewInit {
  @ViewChild('search') searchElementRef: ElementRef;


  address = '123 Maple Lane';


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService: LocationService
  ) {}

  ngAfterViewInit(): void {
    this.findAddress();
  }

  // findAddress(): void {
  //   this.mapsAPILoader.load().then(() => {
  //     const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {type: 'address'});
  //     autocomplete.addListener("place_changed", () => {
  //       // run inside ngZone if you need change detection to happen when input is selected
  //       this.ngZone.run(() => {
  //         // some details
  //         const place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         // const place = this.testGoogleObject;
  //         console.log(place);
  //         // this.address = place.formatted_address;
  //         // this.web_site = place.website;
  //         // this.name = place.name;
  //         // this.zip_code = place.address_components[place.address_components.length - 1].long_name;
  //         // //set latitude, longitude and zoom
  //         // this.latitude = place.geometry.location.lat();
  //         // this.longitude = place.geometry.location.lng();
  //         // this.zoom = 12;
  //         console.log("place ", place);
  //       });
  //     });
  //   });
  // }
  findAddress(): void {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        { types: ['address'] }
      );
      autocomplete.addListener('place_changed', () => {
        // run inside ngZone if you need change detection to happen when input is selected
        this.ngZone.run(() => {
          // some details
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.locationService.convertGooglePlaceResultToAddress(place);
          // const place = this.testGoogleObject;
          console.log(place);
          const x = place.geometry.location.lng();
          console.log(x);
          // this.address = place.formatted_address;
          // this.web_site = place.website;
          // this.name = place.name;
          // this.zip_code = place.address_components[place.address_components.length - 1].long_name;
          // //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
          console.log('place ', place);
        });
      });
    });
  }
}
