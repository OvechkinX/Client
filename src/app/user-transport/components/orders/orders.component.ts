/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { MatTableDataSource } from '@angular/material';
import { Vehicle } from 'src/app/_models/vehicle';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { OrderService } from 'src/app/_services/order.service';
import { AuthService } from 'src/app/_services/auth.service';
import { GoogleApiService } from 'src/app/_services/googleApi.service';
import { MapsAPILoader } from '@agm/core';

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

  displayedColumns: string[] = ['zaladunek', 'rozladunek', 'typ', 'klient', 'przewoznik', 'buttons', 'status'];
  dataSource: any = new MatTableDataSource<Vehicle>();

  constructor(private vehicleService: VehiclesService, private orderService: OrderService, private authService: AuthService,
              private googleApi: GoogleApiService,  private mapsAPILoader: MapsAPILoader) { }


  ngOnInit() {

    this.orderService.getAllOrdersTransport(this.authService.getId()).subscribe(data => {
      this.orders = data;
      this.dataSource = new MatTableDataSource<Order>(this.orders);
    });

    this.mapsAPILoader.load().then(() => {

     // this.cokolwiek();


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

    // this.getDistancia(this.origin, this.destination);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  hideMap() {
    this.details = false;
  }


  // cokolwiek() {
  //   this.googleApi.getResponse('').subscribe(response => {

  //     const line: any = response.routes[0].overview_polyline.points;
  //     const decodedPath = google.maps.geometry.encoding.decodePath(line);

  //     this.path = decodedPath;
  //     console.log(this.path);
  //   });

  // }

  startOrder(i: any) {
    const orderToUpdate = { orderId: this.orders[i].orderId, adminId: this.orders[i].adminId,
      vehicleId: this.orders[i].vehicleId, loadId: this.orders[i].loadId, status: 'W Trakcie' };
    this.orderService.updateStatus(orderToUpdate);
  }

  endOrder(i: any) {
    const orderToUpdate = { orderId: this.orders[i].orderId, adminId: this.orders[i].adminId,
      vehicleId: this.orders[i].vehicleId, loadId: this.orders[i].loadId, status: 'Zrealizowano' };
    this.orderService.updateStatus(orderToUpdate);
  }

}
