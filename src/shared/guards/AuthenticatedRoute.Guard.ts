import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { AuthentificationService } from './../../app/core/usercases/Authentification.Service';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthenticatedRouteGuard implements CanActivate {

    constructor(
      private router: Router,
      private authService: AuthentificationService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isConnected()) { return true; }
        else {
          this.router.navigate(['/login']);
          return false;
        }
    }
}
