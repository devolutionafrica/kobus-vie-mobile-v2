import { Injectable } from '@angular/core';
import { AuthentificationService } from './../../app/core/usercases/Authentification.Service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UnauthenticatedRouteGuard implements CanActivate {

    constructor(
      private router:Router,
      private authService:AuthentificationService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isConnected()) return true
        else {
          this.router.navigate(['/dashboard'])
          return false
        }
    }
}
