import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListenerRouterService {

  listener:BehaviorSubject<RoutesRecognized[]>;
  constructor( private router:Router){
    this.listener = new BehaviorSubject<RoutesRecognized[]>([]);
  }

  connectListener(){
    this.router.events.pipe(
      filter(
        (evt:any) => evt instanceof RoutesRecognized), pairwise())
        .subscribe((events: RoutesRecognized[]) => {
          this.listener.next(events);
        }
      );
  }

  getListenerRouter():RoutesRecognized[]{
    return this.listener.value;
  }
}
