import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/order';
import { Observable } from 'rxjs';
import { OrderToUpdate } from '../_models/orderToUpdate';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  forwarderBaseUrl = 'https://localhost:5001/api/orders/all';
  transportBaseUrl = 'https://localhost:5001/api/orders/transport/all';
  baseUrl = 'https://localhost:5001/api/orders/';

  constructor(private http: HttpClient, private alertifyService: AlertifyService) { }


  getAllOrders(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.forwarderBaseUrl + `/${id}`);
  }

  getAllOrdersTransport(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.transportBaseUrl + `/${id}`);
  }

  updateStatus(order: OrderToUpdate) {
    this.http.post(this.baseUrl + 'update', order).subscribe(() => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  addOrder(orderToUpdate: OrderToUpdate) {
    this.http.post<OrderToUpdate>(this.baseUrl, orderToUpdate).subscribe(() => {
      this.alertifyService.success('Pomyślnie Utworzono Zlecenie');
    }, error => {
      console.log(error);
    });
  }


}
