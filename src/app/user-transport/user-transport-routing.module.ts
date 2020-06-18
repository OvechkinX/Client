import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTransportComponent } from './user-transport.component';
import { RoleGuardService as RoleGuard } from '../_services/role-guard.service';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';
import { OrdersComponent } from './components/orders/orders.component';




const  routes: Routes  = [
{
path:  'user-transport',
component: UserTransportComponent,
canActivate: [RoleGuard],
    data: {
      expectedRole: 'Transport'
    },
children: [
{
path:  'vehicle-view',
component:  VehicleViewComponent
},
{
path:  'add-vehicle',
component:  AddVehicleComponent
},
{
  path:  'orders',
  component:  OrdersComponent
  }
]
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  UserTransportRoutingModule { }
