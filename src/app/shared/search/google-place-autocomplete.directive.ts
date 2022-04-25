import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { GoogleAutocomplete, GooglePlaceResult } from '../model';
import { DOCUMENT } from '@angular/common';
import MapsEventListener = google.maps.MapsEventListener;

const GOOGLE_API_KEY_MISSING =
  '\nYou must provide your own Google API Key for the Meal Mojo app to work.' +
  '\nTo get an API Key visit: https://developers.google.com/maps/documentation/geolocation/get-api-key' +
  '\nAdd the API key to the GoogleAPI script declaration in index.html.';

@Directive({
  selector: '[appGooglePlaceAutocomplete]',
})
export class GooglePlaceAutocompleteDirective implements AfterViewInit, OnDestroy {
  @Output() placeChanged = new EventEmitter<GooglePlaceResult>();
  mapEventListener: MapsEventListener;
  autocomplete: GoogleAutocomplete;
  private readonly window: Window;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private el: ElementRef,
    private ngZone: NgZone
  ) {
    this.window = this.document.defaultView;
  }

  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement, {
      types: ['address'],
      componentRestrictions: { country: ['us', 'ca'] },
    });
    this.addPlaceChangedListener(this.autocomplete);
  }

  addPlaceChangedListener(autocomplete: GoogleAutocomplete) {
    this.mapEventListener = autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.placeChanged.emit(autocomplete.getPlace());
      });
    });
  }

  ngOnDestroy(): void {
    this.mapEventListener?.remove();
  }
}
