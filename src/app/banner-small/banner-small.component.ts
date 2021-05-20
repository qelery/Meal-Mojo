import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner-small',
  templateUrl: './banner-small.component.html',
  styleUrls: ['./banner-small.component.css']
})
export class BannerSmallComponent implements OnInit {
  @Input() headline: any;
  @Input() tagline: any;
  @Input() heroImageUrl: any;
  @Input() backgroundPositionY = 0;

  constructor() {}


  ngOnInit(): void {
  }

}
