import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Profile } from '../profile/profile';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'afford-calc',
    templateUrl: './affordability.component.html',
})
export class AffordabilityComponent  { 
    profile: Profile;
    savings = 0;
    monthlyIncome = 0;
    monthlyExpenses = 0;
    itemCost = 0;
    message = '';

    constructor(
        private profileService: ProfileService,
        private route: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.route.data
              .subscribe((data: { profile: Profile }) => {
                this.profile = data.profile;
              });
        console.log(this.profile);
        for(var income in this.profile.income) {
            this.monthlyIncome += this.profile.income[income].income_amount;
        }
        for(var expense in this.profile.expenses) {
            this.monthlyExpenses += this.profile.expenses[expense].expense_amount;
        }
    }

    canAfford(event: any) {
        event.preventDefault();
        var netIncome = this.monthlyIncome - this.monthlyExpenses;
        if((netIncome - this.itemCost) > 0) {
            this.message = "Yes, you can afford it based on your current income";
        } else if ((netIncome - this.itemCost + this.savings) > 0) {
            this.message = "Yes, but at the cost of your savings. Consider waiting.";
        } else {
            this.message = "No, we strongly advise waiting";
        }
    }
}
