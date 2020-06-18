import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import * as url from './../../index';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:5001/api/auth/';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getRole() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const role = decoded.role;
    return role;
}

  getName() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const name = decoded.given_name;
    return name;
  }

  getId() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const id = decoded.nameid;
    return id;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate([url.baseApiUrl]);
  }

}
