/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadsService } from 'src/app/_services/loads.service';
import { Load } from 'src/app/_models/load';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/_services/auth.service';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { AgmDirectionModule } from 'agm-direction';
import { MapsAPILoader } from '@agm/core';





@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public loads: Load[] = [];

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

  displayedColumns: string[] = ['załadunek', 'rozładunek', 'rodzaj', 'waga', 'objetosc', 'buttons', 'status'];
  dataSource: any = new MatTableDataSource<Load>();

  constructor(private loadService: LoadsService, private authService: AuthService, public dialog: MatDialog,
              private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.loadService.getLoads(this.authService.getId()).subscribe(data => {
      this.loads = data;

      this.dataSource = new MatTableDataSource<Load>(this.loads);
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setPosition(i: any) {

    this.details = true;
    this.latitude = this.dataSource.data[i + this.dataSource.paginator.pageIndex * 5].latitude1;
    this.longitude = this.dataSource.data[i + this.dataSource.paginator.pageIndex  * 5].longitude1;
    this.latitude2 = this.dataSource.data[i + this.dataSource.paginator.pageIndex  * 5].latitude2;
    this.longitude2 = this.dataSource.data[i + this.dataSource.paginator.pageIndex  * 5].longitude2;

    this.origin = { lat: this.dataSource.data[i + this.dataSource.paginator.pageIndex  * 5].latitude1,
       lng: this.dataSource.data[i + this.dataSource.paginator.pageIndex  * 5].longitude1 };
    this.destination = { lat: this.dataSource.data[i + this.dataSource.paginator.pageIndex  * 5].latitude2,
       lng: this.dataSource.data[i + this.dataSource.paginator.pageIndex  * 5].longitude2 };


    this.mapsAPILoader.load().then(() => {

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


  checkButton() {
   console.log('Działa');
  }

  hideMap() {
    this.details = false;
  }



  // getDistancia(origen: string, destino: string) {
  //   return new google.maps.DistanceMatrixService()
  //   .getDistanceMatrix({origins: [origen], destinations: [destino], travelMode: 'DRIVING'}, (results: any) => {
  //       console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.value);
  //   });
  // }

  openDialog(i: any): void {
    const dialogRef = this.dialog.open(OrderUpdateComponent, {
      width: '1200px',
      data: {loads: this.loads, index: (i + this.dataSource.paginator.pageIndex * 5)}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  deleteLoad(i: any) {
    this.loadService.deleteLoad(this.loads[i].loadId).subscribe(
      () => {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      },
    error => console.log(error));
  }


}
