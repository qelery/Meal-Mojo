import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { BannerComponent } from '../banner/banner.component';
import { MapsAPILoader } from '@agm/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddressBarComponent } from '../address-bar/address-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddressBarComponent,
        AutocompleteComponent,
        BannerComponent,
        HomeComponent,
      ],
      imports: [FormsModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: MapsAPILoader,
          useValue: {
            load() {
              return new Promise(() => null);
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
