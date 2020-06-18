import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTransportComponent } from './user-transport.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../_shared/shared.module';
import { UserTransportRoutingModule } from './user-transport-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';
import { OrdersComponent } from './components/orders/orders.component';
import { VehicleUpdateComponent } from './components/vehicle-view/vehicle-update/vehicle-update.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';



@NgModule({
  declarations: [UserTransportComponent, SidebarComponent, AddVehicleComponent,
     VehicleViewComponent, OrdersComponent, VehicleUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserTransportRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule,
    AgmDirectionModule
  ]
})
export class UserTransportModule { }
