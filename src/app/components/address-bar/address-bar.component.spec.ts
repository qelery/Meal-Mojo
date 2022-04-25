import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBarComponent } from './address-bar.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { mockAddress, mockGooglePlaceResults } from '@test/mock-data';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { LocationService } from '../../service/location/location.service';
import { AddressStoreActions, AddressStoreSelectors } from '@store/address-store';
import { RouterTestingModule } from '@angular/router/testing';
import { skip } from 'rxjs';
import { Router } from '@angular/router';

describe('AddressBarComponent', () => {
  let component: AddressBarComponent;
  let fixture: ComponentFixture<AddressBarComponent>;
  let locationService: jasmine.SpyObj<LocationService>;
  let router: jasmine.SpyObj<Router>;
  let mockStore: MockStore;

  beforeEach(async () => {
    const locationServiceSpy = jasmine.createSpyObj('LocationService', [
      'convertGooglePlaceToAddress',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddressBarComponent],
      imports: [FontAwesomeTestingModule, RouterTestingModule],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    locationService = TestBed.inject(LocationService) as jasmine.SpyObj<LocationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set address when Google Place autocomplete result option is selected', () => {
    locationService.convertGooglePlaceToAddress.and.returnValue(mockAddress);
    const input = fixture.debugElement.query(By.css('input'));

    input.triggerEventHandler('placeChanged', mockGooglePlaceResults[0]);

    expect(component.address).toEqual(mockAddress);
  });

  describe('When submit address button pressed', () => {
    it('should do nothing if a address is not selected', () => {
      component.address = undefined;

      component.submitAddress();

      // Skip the NgRx 'store init' action, then listen for any subsequent actions
      mockStore.scannedActions$.pipe(skip(1)).subscribe((unexpectedAction) => {
        if (unexpectedAction) {
          fail();
        }
      });
    });

    it('should dispatch action to updateAddress action if an address was selected', () => {
      mockStore.overrideSelector(AddressStoreSelectors.selectAddressError, null);
      mockStore.overrideSelector(AddressStoreSelectors.selectAddressIsLoading, true);
      component.address = mockAddress;

      component.submitAddress();

      mockStore.scannedActions$.pipe().subscribe((action) => {
        expect(action).toEqual(
          AddressStoreActions.updateAddress({ address: mockAddress })
        );
      });
    });

    it('should redirect to restaurants page when address selected', () => {
      mockStore.overrideSelector(AddressStoreSelectors.selectAddressError, null);
      mockStore.overrideSelector(AddressStoreSelectors.selectAddressIsLoading, false);
      component.address = mockAddress;

      component.submitAddress();

      expect(router.navigate).toHaveBeenCalledOnceWith(['/restaurants']);
    });
  });
});
