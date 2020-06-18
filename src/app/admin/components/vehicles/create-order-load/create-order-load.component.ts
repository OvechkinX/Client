import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderToUpdate } from 'src/app/_models/orderToUpdate';
import { AuthService } from 'src/app/_services/auth.service';
import { OrderService } from 'src/app/_services/order.service';


@Component({
  selector: 'app-create-order-load',
  templateUrl: './create-order-load.component.html',
  styleUrls: ['./create-order-load.component.css']
})
export class CreateOrderLoadComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateOrderLoadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private orderService: OrderService) { }

  loads;
  order: OrderToUpdate;

  ngOnInit() {

    this.loads = this.data.loads;

    this.checkParams(this.loads);

  }

  checkParams(loads) {
    loads.forEach(element => {
      if ((new Date(element.loadingDate) >= new Date(this.data.vehicles[this.data.index].dateFrom) &&
        (new Date(element.unloadingDate) <= new Date(this.data.vehicles[this.data.index].dateTo)))) {
          element.dateAvailable = true;
      } else {
        element.dateAvailable = false;
      }

      if (element.type !== this.data.vehicles[this.data.index].type) {
        element.typeAvailable = false;
      } else {
        element.typeAvailable = true;
      }

      if (element.volume > this.data.vehicles[this.data.index].volume) {
        element.volumeAvailable = false;
      } else {
        element.volumeAvailable = true;
      }

      if (element.weight > this.data.vehicles[this.data.index].weight) {
        element.weightAvailable = false;
      } else {
        element.weightAvailable = true;
      }

    });
  }

  addOrder(i: any) {
    this.order = new OrderToUpdate();
    this.order.adminId = this.authService.getId();
    this.order.loadId = this.data.loads[i].loadId;
    this.order.vehicleId = this.data.vehicles[this.data.index].vehicleId;
    this.order.status = 'Oczekuje';


    this.orderService.addOrder(this.order);


    window.location.reload();

  }

}
