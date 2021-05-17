import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.css']
})
export class BrickComponent implements OnInit {
  direction: string = 'right';

  constructor() { }

  ngOnInit(): void {
  }

}
