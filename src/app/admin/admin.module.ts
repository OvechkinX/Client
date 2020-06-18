import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../_shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { LoadsComponent } from './components/loads/loads.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from '../material/material.module';
import { AgmDirectionModule } from 'agm-direction';
import { CreateOrderLoadComponent } from './components/vehicles/create-order-load/create-order-load.component';
import { CreateOrderComponent } from './components/loads/create-order/create-order.component';







@NgModule({
  declarations: [AdminComponent, SidebarComponent, OrdersComponent, LoadsComponent, VehiclesComponent, CreateOrderLoadComponent, CreateOrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AgmCoreModule,
    AgmDirectionModule
  ]
})
export class AdminModule { }
