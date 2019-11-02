import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('JWT_TOKEN')) {
            console.log("inside login AuthGuard ");
            console.log("inside login AuthGuard " + localStorage.getItem('JWT_TOKEN'));
            this.router.navigate(['home']);
            return true;
        }
        console.log("outside login AuthGuard");
        return true;
    }
}