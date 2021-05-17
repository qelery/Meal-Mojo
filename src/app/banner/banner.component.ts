import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  heroImageUrl: string;

  constructor() {
    this.heroImageUrl = "/assets/image/heroimage.jpeg";
  }

  ngOnInit(): void {
  }

}
