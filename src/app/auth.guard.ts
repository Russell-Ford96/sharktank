import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token') != null) {
            if((route.url[0].path == 'login') || (route.url[0].path == 'register')) {
                //logged in so redirect to profile
                this.router.navigate(['/profile'], { queryParams: { returnUrl: state.url }});
            }
            // just checking if they have a token for now
            // logged in so return true
            return true;
        } else if(route.url[0].path == 'register') {
            return true;
        } else if(route.url[0].path == 'login') {
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
