import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-small',
  templateUrl: './banner-small.component.html',
  styleUrls: ['./banner-small.component.css'],
})
export class BannerSmallComponent implements OnInit {
  @Input() headline: string;
  @Input() tagline: string;
  @Input() heroImageUrl: string;
  @Input() backgroundPositionY = 0;
  constructor() {}

  ngOnInit(): void {}
}
