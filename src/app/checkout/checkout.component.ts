import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  imageUrl: any;
  constructor() {
    this.imageUrl = "https://www.escoffier.edu/wp-content/uploads/2021/05/Smiling-female-Barista-with-glasses-Serves-Order-to-a-Food-Delivery-Courier-Picking-Up-Paper-Bag-with-Pastries-from-a-Cafe-Restaurant.jpeg";
  }

  ngOnInit(): void {
  }

}
