import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent  { 
    token: boolean = this.authService.hasToken;
    constructor( private authService: AuthService ) {}

    logout() {
        this.authService.logout();
    }

    hasToken(): boolean {
        if(localStorage.getItem('token') != null) {
            return true;
        } else {
            return false;
        }
    }
}
