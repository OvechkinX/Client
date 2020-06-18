import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Load } from 'src/app/_models/load';
import { LoadsService } from 'src/app/_services/loads.service';
import { AuthService } from 'src/app/_services/auth.service';
import { MapsAPILoader } from '@agm/core';
import { CreateOrderComponent } from './create-order/create-order.component';
import { Vehicle } from 'src/app/_models/vehicle';
import { VehiclesService } from 'src/app/_services/vehicles.service';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.css']
})
export class LoadsComponent implements OnInit {


  public loads: Load[] = [];
  public vehicles: Vehicle[] = [];

  displayedColumns: string[] = ['załadunek', 'rozładunek', 'typ', 'waga', 'objetosc', 'buttons'];
  dataSource: any = new MatTableDataSource<Load>();

  latitude: any;
  longitude: any;
  latitude2: any;
  longitude2: any;

  public lat: any;
  public lng: any;
  public origin: any;
  public destination: any;

  details = false;

  distanceMatrix;
  travelMode;
  distance;
  duration;


  constructor(private loadService: LoadsService, private authService: AuthService,  private mapsAPILoader: MapsAPILoader,
              public dialog: MatDialog, private vehicleService: VehiclesService) { }


  ngOnInit() {

    this.vehicleService.getAllVehicles().subscribe(data => {
      this.vehicles = data;
    });

    this.loadService.getAllLoads().subscribe(data => {
      this.loads = data;

      this.dataSource = new MatTableDataSource<Load>(this.loads);
    });

  }

  openDialog(i: any): void {
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      width: '1200px',
      data: {vehicles: this.vehicles, index: i, loads: this.loads}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  setPosition(i: any) {

    this.details = true;
    this.latitude = this.dataSource.data[i].latitude1;
    this.longitude = this.dataSource.data[i].longitude1;
    this.latitude2 = this.dataSource.data[i].latitude2;
    this.longitude2 = this.dataSource.data[i].longitude2;

    this.origin = { lat: this.dataSource.data[i].latitude1,
       lng: this.dataSource.data[i].longitude1 };
    this.destination = { lat: this.dataSource.data[i].latitude2,
       lng: this.dataSource.data[i].longitude2 };

    this.mapsAPILoader.load().then(() => {

        this.travelMode = 'driving';
        this.distanceMatrix = new google.maps.DistanceMatrixService();
        const request: google.maps.DistanceMatrixRequest = {
            origins: [this.origin],
            destinations: [this.destination],
            travelMode: google.maps.TravelMode.DRIVING
          };

        this.distanceMatrix.getDistanceMatrix(request, (response, status) => {
            if (status === google.maps.DistanceMatrixStatus.OK &&
              response.rows[0].elements[0].status === google.maps.DistanceMatrixElementStatus.OK ) {
                this.distance = response.rows[0].elements[0].distance.text;
                this.duration = response.rows[0].elements[0].duration.text;
              }
          });

        });

  }

  hideMap() {
    this.details = false;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
