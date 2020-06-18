import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private callAction = new Subject<string>();
  callAction$ = this.callAction.asObservable();

  constructor() { }

  sendMessage(message: string) {
    this.callAction.next(message);
  }

}
