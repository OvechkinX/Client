import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoaderComponent } from './user-loader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../_shared/shared.module';
import { UserLoaderRoutingModule } from './user-loader-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { MapComponent } from './components/map/map.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { OrderUpdateComponent } from './components/orders/order-update/order-update.component';



@NgModule({
  declarations: [UserLoaderComponent, SidebarComponent, OrdersComponent, AddOrderComponent, MapComponent, OrderUpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    UserLoaderRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule,
    AgmDirectionModule
  ]
})
export class UserLoaderModule { }
