import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/_models/vehicle';
import { VehiclesService } from 'src/app/_services/vehicles.service';


@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrls: ['./vehicle-update.component.css']
})
export class VehicleUpdateComponent implements OnInit {


  car: Vehicle;
  editCar: FormGroup;
  submitted = false;


  constructor(
    public dialogRef: MatDialogRef<VehicleUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleService: VehiclesService ) {}

  ngOnInit() {

    this.editCar = new FormGroup({
      brand: new FormControl(this.data.vehicles[this.data.index].brand, Validators.required),
      model: new FormControl(this.data.vehicles[this.data.index].model, Validators.required),
      registration: new FormControl(this.data.vehicles[this.data.index].registration, Validators.required),
      type: new FormControl(this.data.vehicles[this.data.index].type, Validators.required),
      weight: new FormControl(this.data.vehicles[this.data.index].weight, Validators.required),
      volume: new FormControl(this.data.vehicles[this.data.index].volume, Validators.required),
      dateFrom: new FormControl(this.data.vehicles[this.data.index].dateFrom, Validators.required),
      dateTo: new FormControl(this.data.vehicles[this.data.index].dateTo, Validators.required)
    });

  }

  get f() { return this.editCar.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    this.car = new Vehicle();
    this.car.vehicleId = this.data.vehicles[this.data.index].vehicleId;
    this.car.brand = this.editCar.controls.brand.value;
    this.car.model = this.editCar.controls.model.value;
    this.car.registration = this.editCar.controls.registration.value;
    this.car.type = this.editCar.controls.type.value;
    this.car.weight = this.editCar.controls.weight.value;
    this.car.volume = this.editCar.controls.volume.value;
    this.car.dateFrom = this.editCar.controls.dateFrom.value;
    this.car.dateTo = this.editCar.controls.dateTo.value;
    this.car.transportId = this.data.vehicles[this.data.index].transportId;
    this.car.status = this.data.vehicles[this.data.index].status;

    // console.log(this.car);

    this.submitted = true;
    if (this.editCar.invalid) {
        return;
    }


    this.vehicleService.updateVehicle(this.car);

  }

}
