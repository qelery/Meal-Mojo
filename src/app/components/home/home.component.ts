import { Component } from '@angular/core';
import { infoTiles } from './info-tiles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  tiles = infoTiles;

  constructor() {}
}

