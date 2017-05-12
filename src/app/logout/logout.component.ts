import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'logout',
    template: '<h1>You have been successfully logged out!</h1>'
})
export class LogoutComponent  { 
    constructor( private authService: AuthService,
    ) { this.logout() }

    logout() {
        this.authService.logout();
    }
}
