/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Vehicle } from 'src/app/_models/vehicle';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { OrderService } from 'src/app/_services/order.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Order } from 'src/app/_models/order';
import { GoogleApiService } from 'src/app/_services/googleApi.service';
import { MapsAPILoader } from '@agm/core';
import { timeout, delay } from 'rxjs/operators';





@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Order[] = [];

  details = false;

  public origin: any;
  public destination: any;

  latitude: any;
  longitude: any;
  latitude2: any;
  longitude2: any;

  distanceMatrix;
  travelMode;
  distance;
  duration;

  path: any;

  simLat;
  simLng;

  iconUrl = '../../../../assets/img/car.png';

  displayedColumns: string[] = ['zaladunek', 'rozladunek', 'typ', 'klient', 'przewoznik', 'status', 'buttons'];
  dataSource: any = new MatTableDataSource<Vehicle>();

  constructor(private vehicleService: VehiclesService, private orderService: OrderService, private authService: AuthService,
              private googleApi: GoogleApiService,  private mapsAPILoader: MapsAPILoader) { }


  ngOnInit() {

    this.orderService.getAllOrders(this.authService.getId()).subscribe(data => {
      this.orders = data;
      this.dataSource = new MatTableDataSource<Order>(this.orders);
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


    if (this.orders[i].status === 'W Trakcie') {
      this.mapsAPILoader.load().then(() => {

        this.track(this.latitude, this.longitude, this.latitude2, this.longitude2);

     });
      }

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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  hideMap() {
    this.details = false;
  }
  private delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }

  track(latitude, longitude, latitude2, longitude2) {
    this.googleApi.getResponse(latitude, longitude, latitude2, longitude2).subscribe(async response => {

      const line: any = response.routes[0].overview_polyline.points;
      const decodedPath = google.maps.geometry.encoding.decodePath(line);


      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < decodedPath.length; i++) {

        this.simLat = decodedPath[i].lat();
        this.simLng = decodedPath[i].lng();

        await this.delay(1000);

      }

     });

  }



}


