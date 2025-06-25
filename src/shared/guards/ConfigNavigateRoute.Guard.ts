import { StoreService } from '../../app/providers/store.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ConfigNavigateRouteGuard implements CanActivate {

    constructor(
      private router:Router,
      private store:StoreService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let configStep = this.store.storeValue('configStep')
        if (configStep.step === 'COMPLETED'){
          this.router.navigate(['/login'])
          return false
        }
        else return true
      }
}
