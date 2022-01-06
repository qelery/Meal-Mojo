import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import { MapsAPILoader } from '@agm/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: MapsAPILoader, useValue: { load() { return new Promise(() => null); }}}],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
