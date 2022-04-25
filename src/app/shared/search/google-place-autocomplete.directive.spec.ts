import { GooglePlaceAutocompleteDirective } from './google-place-autocomplete.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { GooglePlaceResult } from '../model';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <input (placeChanged)="onPlaceChanged($event)" appGooglePlaceAutocomplete />
  `,
})
class TestComponent {
  place: GooglePlaceResult;

  onPlaceChanged(place: GooglePlaceResult): void {
    this.place = place;
  }
}

describe('GooglePlaceAutocompleteDirective', () => {
  let directive: GooglePlaceAutocompleteDirective;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GooglePlaceAutocompleteDirective, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    directive = fixture.debugElement
      .query(By.directive(GooglePlaceAutocompleteDirective))
      .injector.get(GooglePlaceAutocompleteDirective);
    fixture.detectChanges();
  });

  it('should be able to create an element with the directive', () => {
    const element = fixture.debugElement.query(
      By.directive(GooglePlaceAutocompleteDirective)
    );
    expect(element).toBeTruthy();
  });

  it(`should remove 'place_changed' event listener on destroy`, () => {
    directive.ngOnDestroy();

    const listenerExists = google.maps.event.hasListeners(
      directive.autocomplete,
      'place_changed'
    );
    expect(listenerExists).toBeFalse();
  });
});
