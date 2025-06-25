import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from '../../app/core/usercases/Authentification.Service';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class FirstConnexionRouteGuard implements CanActivate {

    constructor(
      private router: Router,
      private authService: AuthentificationService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isFirstConnexion()) return true
        else {
          this.router.navigate(['/dashboard']);
          return false;
        }
    }
}
