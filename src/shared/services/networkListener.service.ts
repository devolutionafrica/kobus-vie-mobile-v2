import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NetworkListenerService {
  networkStatus: boolean;
  networkStatusBehaviorSubject: BehaviorSubject<boolean>;
  constructor() {
      this.networkStatus = true;
      this.networkStatusBehaviorSubject = new BehaviorSubject<boolean>(this.networkStatus);
    }

  checkNetworkStatus(): any{
   return setInterval(
      () => {
        this.networkStatus = window.navigator.onLine;
        this.networkStatusBehaviorSubject.next(this.networkStatus);
      }
    , 1500);
  }

  isOnline(): boolean {
    return this.networkStatus;
  }
}
