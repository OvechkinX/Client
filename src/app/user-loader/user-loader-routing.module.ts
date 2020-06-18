import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoaderComponent } from './user-loader.component';
import { RoleGuardService as RoleGuard } from '../_services/role-guard.service';
import { OrdersComponent } from './components/orders/orders.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { MapComponent } from './components/map/map.component';





const  routes: Routes  = [
{
path:  'user-loader',
component: UserLoaderComponent,
canActivate: [RoleGuard],
    data: {
      expectedRole: 'Loader'
    },
children: [
{
path:  'orders',
component:  OrdersComponent
},
{
path:  'add-order',
component:  AddOrderComponent
},
{
path: 'map',
component: MapComponent
}
]
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  UserLoaderRoutingModule { }
