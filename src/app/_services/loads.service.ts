import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Load } from '../_models/load';
import { AlertifyService } from './alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadsService {

  baseUrl = 'https://localhost:5001/api/loads/';

  constructor(private http: HttpClient, private alertifyService: AlertifyService, private router: Router, private r: ActivatedRoute) { }

  addLoads(load: Load) {
    this.http.post(this.baseUrl, load).subscribe(() => {
      this.alertifyService.success('Pomyślnie dodano ładunek');
      // this.router.navigate(['../orders'], { relativeTo: this.r.parent });
    }, error => {
      console.log(error);
      this.alertifyService.error(error);
    });
  }

  getLoads(id: string): Observable<Load[]> {
    return this.http.get<Load[]>(this.baseUrl + `${id}`);
  }

  getAllLoads(): Observable<Load[]> {
    return this.http.get<Load[]>(this.baseUrl);
  }

  deleteLoad(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

  updateLoad(load: Load) {
    this.http.post(this.baseUrl + 'update', load).subscribe(() => {
      this.alertifyService.success('Pomyślnie edytowano zlecenie');
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

}
