import {Component, Input, OnInit} from '@angular/core';
import {BrickInfo} from "../home/home.component";

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.css']
})
export class BrickComponent implements OnInit {
  @Input() direction: any;
  @Input() brickInfo: any;
  constructor() { }

  ngOnInit(): void {
  }

  getUrl() {
    return ;
  }
}
