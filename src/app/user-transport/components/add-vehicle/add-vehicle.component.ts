import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/_models/vehicle';
import { AuthService } from 'src/app/_services/auth.service';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  vehicle: Vehicle;

  addCar: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private vehicleService: VehiclesService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.addCar = new FormGroup({
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      registration: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      volume: new FormControl('', Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required)
    });


  }


  get f() { return this.addCar.controls; }

  onSubmit() {

    this.vehicle = new Vehicle();
    this.vehicle.brand = this.addCar.controls.brand.value;
    this.vehicle.model = this.addCar.controls.model.value;
    this.vehicle.registration = this.addCar.controls.registration.value;
    this.vehicle.type = this.addCar.controls.type.value;
    this.vehicle.weight = this.addCar.controls.weight.value;
    this.vehicle.volume = this.addCar.controls.volume.value;
    this.vehicle.dateFrom = this.addCar.controls.dateFrom.value;
    this.vehicle.dateTo = this.addCar.controls.dateTo.value;
    this.vehicle.transportId = this.authService.getId();
    this.vehicle.status = 'Dostępny';

    this.submitted = true;
    if (this.addCar.invalid) {
        return;
    }

    this.vehicleService.addVehicle(this.vehicle);
    this.router.navigate(['../vehicle-view'], { relativeTo: this.route }).then(() => {
      window.location.reload();
    });

  }


}
