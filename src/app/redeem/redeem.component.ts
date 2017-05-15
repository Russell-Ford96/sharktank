import { Component } from '@angular/core';

@Component({
  selector: 'redeem',
    templateUrl: './redeem.component.html',
})
export class RedeemComponent { 
    shopping: boolean = true;
    giftCards: boolean = false;
    travel: boolean = false;
    points: number = 3000;

    shoppingItems = [
        {   name: 'test1',
            image: 'laptop.png',
            points: 1000
        },
        {   name: 'test2',
            image: 'download.jpg',
            points: 2000
        },
        {   name: 'test3',
            image: '6814952_sa.jpg',
            points: 3000
        }
    ]
    giftCardItems = [
        {   name: 'test1',
            image: 'laptop.png',
            points: 1000
        },
        {   name: 'test2',
            image: 'download.jpg',
            points: 2000
        },
        {   name: 'test3',
            image: '6814952_sa.jpg',
            points: 3000
        }
    ]
    travelItems = [
        {   name: 'test1',
            image: 'laptop.png',
            points: 1000
        },
        {   name: 'test2',
            image: 'download.jpg',
            points: 2000
        },
        {   name: 'test3',
            image: '6814952_sa.jpg',
            points: 3000
        }
    ]


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
