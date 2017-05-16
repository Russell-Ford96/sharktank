import { Component } from '@angular/core';
import { Reward } from './reward'; 
import { REWARDS } from './rewards-list';

@Component({
  selector: 'redeem',
    templateUrl: './redeem.component.html',
})
export class RedeemComponent { 
    shopping: boolean = true;
    giftCards: boolean = false;
    travel: boolean = false;
    points: number = 3000;

    shoppingItems = REWARDS.shopping;
    giftCardItems = REWARDS.giftCards;
    travelItems = REWARDS.travel;


    viewShopping() {
        this.resetViews();
        this.shopping = true;
    }
    viewGiftCards() {
        this.resetViews();
        this.giftCards = true;
    }
    viewTravel() {
        this.resetViews();
        this.travel = true;
    }
    resetViews() {
        this.shopping = false;
        this.giftCards = false;
        this.travel = false;
    }

    buyItem(points: any) {
        if(this.points - points >= 0)
            this.points -= points;
        else
            alert("You don't have enough points yet!");
    }
}
