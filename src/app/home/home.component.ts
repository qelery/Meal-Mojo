import { Component, OnInit } from '@angular/core';
import { BrickInfo, brickInfo } from "../brick/brickInfo";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  brickInfo: BrickInfo[];
  loadSignInCard: boolean;

  constructor(private router: Router) {
    this.brickInfo = brickInfo;
    this.loadSignInCard = false;
  }

  ngOnInit(): void {
    // if (this.router.url === '/register' || this.router.url === '/login') {
    //   this.loadSignInCard = true;
    // }
  }
}

