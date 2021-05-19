import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-restaurant-store-front-banner',
  templateUrl: './small-banner.component.html',
  styleUrls: ['./small-banner.component.css']
})
export class SmallBannerComponent implements OnInit {
  @Input() headline: any;
  @Input() tagline: any;
  @Input() heroImageUrl: any;
  @Input() backgroundPositionY = 0;

  constructor() {}


  ngOnInit(): void {
  }

}
