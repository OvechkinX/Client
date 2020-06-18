import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoadsComponent } from './components/loads/loads.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AuthGuardService as AuthGuard } from '../_services/auth-guard.service';
import { RoleGuardService as RoleGuard } from '../_services/role-guard.service';




const  routes: Routes  = [
{
path:  'admin',
component:  AdminComponent,
canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    },
children: [
{
    path:  'orders',
    component:  OrdersComponent
},
{
    path:  'loads',
    component:  LoadsComponent
},
{
    path:  'vehicles',
    component:  VehiclesComponent
}
]
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  AdminRoutingModule { }
