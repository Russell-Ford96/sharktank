import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileDetailResolve implements Resolve<any> {
    constructor(private profileService: ProfileService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let token = localStorage.getItem('token');
        var incomeArray = Array();
        var expenseArray = Array();
        return this.profileService.getProfileData(token).then(profile => {
            if (profile) {
                profile.firstName = profile.firstName.substring(1,profile.firstName.length - 1);
                profile.lastName = profile.lastName.substring(1,profile.lastName.length - 1);
                for(var income in profile.income) {
                    var income_name = String(profile.income[income].income_name);
                    incomeArray.push({
                        'income_name': income_name.substring(1,income_name.length - 1), 
                        'income_amount': profile.income[income].income_amount
                    });
                }
                profile.income = incomeArray;
                for(var expense in profile.expenses) {
                    var expense_name = String(profile.expenses[expense].expense_name);
                    expenseArray.push({
                        'expense_name': expense_name.substring(1,expense_name.length - 1), 
                        'expense_amount': profile.expenses[expense].expense_amount
                    });
                }
                profile.expenses = expenseArray;
                console.log(profile);
                return profile;
            } else { // id not found
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
}
