import { APP_SESSION_KEY } from './../../app/config/config';
import { SessionService } from './../../app/providers/session.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class StopGoBackRouteGuard implements CanActivate {

    constructor(
      private session:SessionService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let stopBack = this.session.storeValue(APP_SESSION_KEY.STOP_GOBACK)
        if (stopBack === true) return false
        else return true
      }
}
