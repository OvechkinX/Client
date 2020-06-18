import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Vehicle } from '../_models/vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  baseUrl = 'https://localhost:5001/api/vehicles/';

  constructor(private http: HttpClient, private alertifyService: AlertifyService) { }

  addVehicle(vehicle: Vehicle) {
    this.http.post(this.baseUrl, vehicle).subscribe(() => {
      this.alertifyService.success('Pomyślnie dodano Pojazd');
      // this.router.navigate(['../orders'], { relativeTo: this.r.parent });
    }, error => {
      console.log(error);
    });
  }

  getVehicles(id: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl + `${id}`);
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl);
  }

  deleteVehicle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

  updateVehicle(vehicle: Vehicle) {
    this.http.post(this.baseUrl + 'update', vehicle).subscribe(() => {
      this.alertifyService.success('Pomyślnie edytowano pojazd');
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

}
