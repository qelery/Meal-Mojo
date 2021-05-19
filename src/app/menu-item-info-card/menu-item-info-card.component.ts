import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-item-info-card',
  templateUrl: './menu-item-info-card.component.html',
  styleUrls: ['./menu-item-info-card.component.css']
})
export class MenuItemInfoCardComponent implements OnInit {
  @Input() menuItem: any;
  constructor() { }

  ngOnInit(): void {
  }

}
