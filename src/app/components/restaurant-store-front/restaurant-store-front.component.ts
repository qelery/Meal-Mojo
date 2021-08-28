import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../service/order/order.service";


@Component({
  selector: 'app-restaurant-store-front',
  templateUrl: './restaurant-store-front.component.html',
  styleUrls: ['./restaurant-store-front.component.css']
})
export class RestaurantStoreFrontComponent implements OnInit {
  restaurantId: number;
  restaurant: any;
  menuItems: any;
  generalAddress: string;
  restaurantName: string;
  currentDayOfWeek: string;
  openTime: string;
  closeTime: string;
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.setCurrentDay();

    this.route.paramMap
      .subscribe(params => {
        this.restaurantId = +params.get('id');
        this.orderService.getRestaurantData(this.restaurantId).subscribe((response: any) => {
          this.restaurant = response;
          this.menuItems = response.menuItems;
          this.restaurantName = response.businessName;
          const address = response.address;
          this.generalAddress = `${address.street1}, ${address.city}`;
          const hours = response.operatingHoursList
            .find((hour: any) => hour.dayOfWeek === this.currentDayOfWeek.toUpperCase());
          this.openTime = hours.openTime ? this.convertToShortTime(hours.openTime) : 'Unknown';
          this.closeTime = hours.closeTime ? this.convertToShortTime(hours.closeTime) : 'Unknown';
        }, (err: any) => console.log(err));
      });
  }

  setCurrentDay() {
    this.currentDayOfWeek = new Date().toLocaleString('en-us', {  weekday: 'long' });
  }

  convertToShortTime(time: string) {
    // Angular Date pipes can't understand Java's LocalTime object
    let timeParts = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    timeParts = timeParts.slice(1);
    timeParts[3] = +timeParts[0] < 12 ? 'AM' : 'PM';
    timeParts[0] = String(+timeParts[0] % 12 || 12);
    return timeParts[0] + timeParts[1] + timeParts[2] + ' ' + timeParts[3];
  }
}
