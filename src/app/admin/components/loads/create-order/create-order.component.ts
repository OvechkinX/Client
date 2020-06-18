import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from 'src/app/_services/order.service';
import { OrderToUpdate } from 'src/app/_models/orderToUpdate';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  vehicles;
  order: OrderToUpdate;

  constructor(public dialogRef: MatDialogRef<CreateOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private orderService: OrderService, private authService: AuthService) { }


  ngOnInit() {
    this.vehicles = this.data.vehicles;
    // console.log(this.vehicles);

    this.checkParams(this.vehicles);

  }

  checkParams(vehicles) {
    vehicles.forEach(element => {
      if ((new Date(element.dateFrom) <= new Date(this.data.loads[this.data.index].loadingDate) &&
        (new Date(element.dateTo) >= new Date(this.data.loads[this.data.index].unloadingDate)))) {
          element.dateAvailable = true;
      } else {
        element.dateAvailable = false;
      }

      if (element.type !== this.data.loads[this.data.index].type) {
        element.typeAvailable = false;
      } else {
        element.typeAvailable = true;
      }

      if (element.volume >= this.data.loads[this.data.index].volume) {
        element.volumeAvailable = true;
      } else {
        element.volumeAvailable = false;
      }

      if (element.weight >= this.data.loads[this.data.index].weight) {
        element.weightAvailable = true;
      } else {
        element.weightAvailable = false;
      }

    });
  }

  addOrder(i: any) {
    this.order = new OrderToUpdate();
    this.order.adminId = this.authService.getId();
    this.order.loadId = this.data.loads[this.data.index].loadId;
    this.order.vehicleId = this.data.vehicles[i].vehicleId;
    this.order.status = 'Oczekuje';

    this.orderService.addOrder(this.order);


    window.location.reload();

  }

}
