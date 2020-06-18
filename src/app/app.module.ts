import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { UserLoaderModule } from './user-loader/user-loader.module';
import { UserTransportModule } from './user-transport/user-transport.module';
import { LoginModule } from './login/login.module';
import { AuthService } from './_services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from './_services/auth-guard.service';
import { RoleGuardService } from './_services/role-guard.service';
import { AlertifyService } from './_services/alertify.service';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleUpdateComponent } from './user-transport/components/vehicle-view/vehicle-update/vehicle-update.component';
import { OrderUpdateComponent } from './user-loader/components/orders/order-update/order-update.component';
import { GoogleApiService } from './_services/googleApi.service';
import { CreateOrderComponent } from './admin/components/loads/create-order/create-order.component';
import { CreateOrderLoadComponent } from './admin/components/vehicles/create-order-load/create-order-load.component';




export function getToken(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    VehicleUpdateComponent,
    OrderUpdateComponent,
    CreateOrderComponent,
    CreateOrderLoadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UserLoaderModule,
    UserTransportModule,
    LoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcCKcyA6VuIFrXGCmV0GfMklmz4EA1giA',
      libraries: ['places', 'geometry']
    }),
    JwtModule.forRoot({
      config: {
          tokenGetter: getToken
      }
  }),
    BrowserAnimationsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthService, JwtHelperService, AuthGuardService, RoleGuardService, AlertifyService, GoogleApiService
   // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
