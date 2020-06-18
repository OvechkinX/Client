import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { baseApiUrl } from 'src';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;

    if ( !this.auth.isAuthenticated() || this.auth.getRole() !== expectedRole) {
      this.auth.logout();
      this.router.navigate([baseApiUrl]);
      return false;
    }
    return true;
  }
}
