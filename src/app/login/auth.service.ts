import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private headers = new Headers({'Content-Type': 'application/json'});
    hasToken: boolean = this.checkForToken();

    constructor(private http: Http) { }

    checkForToken() {
        var token = localStorage.getItem('token');
        if(token == '' || token == null) {
            return false;
        } else {
            return true;
        }
    }
    login(credentials: any): Promise<any> {
        return this.http.post('api/login', JSON.stringify(credentials), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    register(credentials: any): Promise<any> {
        return this.http.post('api/register', JSON.stringify(credentials), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    logout() {
        localStorage.removeItem('token');
        this.hasToken = false;
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
