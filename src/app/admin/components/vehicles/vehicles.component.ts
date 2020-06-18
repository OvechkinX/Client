import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/_models/vehicle';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { CreateOrderLoadComponent } from './create-order-load/create-order-load.component';
import { Load } from 'src/app/_models/load';
import { LoadsService } from 'src/app/_services/loads.service';



@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  public vehicles: Vehicle[] = [];
  public loads: Load[] = [];

  displayedColumns: string[] = ['model', 'dateFrom', 'dateTo', 'weight', 'volume', 'type', 'buttons'];
  dataSource: any = new MatTableDataSource<Vehicle>();

  constructor(private vehicleService: VehiclesService, public dialog: MatDialog, private loadService: LoadsService) { }

  ngOnInit() {

    this.vehicleService.getAllVehicles().subscribe(data => {
      this.vehicles = data;

      this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);

    });

    this.loadService.getAllLoads().subscribe(data => {
      this.loads = data;
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(i: any): void {
    const dialogRef = this.dialog.open(CreateOrderLoadComponent, {
      width: '1200px',
      data: {vehicles: this.vehicles, index: i, loads: this.loads}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
