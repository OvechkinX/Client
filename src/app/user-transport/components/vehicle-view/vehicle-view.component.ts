import { Component, OnInit, Input } from '@angular/core';
import { MatCardActions, MatDialog } from '@angular/material';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { Vehicle } from 'src/app/_models/vehicle';
import { AuthService } from 'src/app/_services/auth.service';
import { VehicleUpdateComponent } from './vehicle-update/vehicle-update.component';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  public vehicles: Vehicle[] = [];
  trolley: any = '../../../../assets/img/wywrotka.jpg';
  tank: any = '../../../../assets/img/cysterna.jpg';
  universal: any = '../../../../assets/img/uniwersalna.jpg';
  cooler: any = '../../../../assets/img/chłodnia.jpg';


  constructor(private vehicleService: VehiclesService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
      this.vehicleService.getVehicles(this.authService.getId()).subscribe(data => {
      this.vehicles = data;

      for (const item of this.vehicles) {
        if (item.type === 'wywrotka' || item.type === 'Wywrotka') {
          item.img = this.trolley;
        }
        if (item.type === 'chłodnia') {
          item.img = this.cooler;
        }
        if (item.type === 'cysterna') {
          item.img = this.tank;
        }
        if (item.type === 'uniwersalny') {
          item.img = this.universal;
        }
      }

    });
  }

  get(i: any) {
    console.log(i);
  }

  deleteVehicle(i: any) {
    this.vehicleService.deleteVehicle(this.vehicles[i].vehicleId).subscribe(
      () => {
        this.vehicles.splice(i, 1);
      },
    error => console.log(error));
  }

  openDialog(i: any): void {
    const dialogRef = this.dialog.open(VehicleUpdateComponent, {
      width: '1000px',
      data: {vehicles: this.vehicles, index: i}
    });


    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
