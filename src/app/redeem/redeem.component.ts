import { Component } from '@angular/core';
import { Reward } from './reward'; 
import { REWARDS } from './rewards-list';

@Component({
  selector: 'redeem',
    templateUrl: './redeem.component.html',
})
export class RedeemComponent { 
    ROW_SIZE = 3;
    shopping: boolean = true;
    giftCards: boolean = false;
    travel: boolean = false;
    points: number = 3000;

    shoppingItems = REWARDS.shopping;
    shoppingRows = this.convertToRow(REWARDS.shopping, this.ROW_SIZE);
    giftCardItems = REWARDS.giftCards;
    giftCardRows = this.convertToRow(REWARDS.giftCards, this.ROW_SIZE);
    travelItems = REWARDS.travel;
    travelRows = this.convertToRow(REWARDS.giftCards, this.ROW_SIZE);


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

    convertToRow(items: Reward[], rowLength: number){
        let arr = [];
        let triple = [];
        for (let i = 1; i <= items.length + 1; i++) {
            triple.push(items[i - 1]);
            if (i % rowLength === 0 || i === items.length) {
                arr.push(triple);
                triple = [];
            }
        }
        console.log(arr.length);
        return arr;
    }
}
