import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Profile } from './profile';

@Injectable()
export class ProfileService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private profile: Profile;

    constructor(private http: Http) { }
    getProfileData(token: string) {
        return this.http.post('api/profile', JSON.stringify({'token': token}), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    editProfile(data: any) {
        return this.http.put('api/profile', JSON.stringify(data), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    saveIncome(data: any) {
        return this.http.post('api/income', JSON.stringify(data), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    editIncome(data: any) {
        return this.http.put('api/income', JSON.stringify(data), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    deleteIncome(data: any) {
        return this.http.delete('api/income', { body: JSON.stringify(data), headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);

    }
    saveExpense(data: any) {
        return this.http.post('api/expense', JSON.stringify(data), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    editExpense(data: any) {
        return this.http.put('api/expense', JSON.stringify(data), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
    }
    deleteExpense(data: any) {
        return this.http.delete('api/expense', { body: JSON.stringify(data), headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
