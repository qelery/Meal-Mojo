import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.css']
})
export class BrickComponent implements OnInit {
  @Input() direction = '';
  @Input() brickInfo: any;
  constructor() { }

  ngOnInit(): void {
  }

  getUrl() {
    return ;
  }
}
