import {Component, Input, OnInit} from '@angular/core';
import {BrickInfo} from "./brickInfo";

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.css']
})
export class BrickComponent implements OnInit {
  @Input() direction = '';
  @Input() brickInfo: BrickInfo;
  constructor() { }

  ngOnInit(): void {}

}
