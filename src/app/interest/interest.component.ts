import { Component } from '@angular/core';

@Component({
  selector: 'interest-calc',
    templateUrl: './interest.component.html',
})
export class InterestComponent { 
    principal = 0;
    rate = 0;
    time = 0;

    onKey(event: any) { // without type info
        if(event.target.id == "principalInput")
            this.principal = event.target.value;
        else if(event.target.id == "rateInput")
            this.rate = event.target.value;
        else if(event.target.id == "yearsInput")
            this.time = event.target.value;
    }

    calculateInterest() {
        var compoundedInterest;
        this.printValues();
        for(var i = 0; i < this.time; i++) {
            compoundedInterest = this.principal * Math.pow((1 + ((this.rate/100)/1)),(1 * i))
            console.log("Compounded interest: " + compoundedInterest);
        }
    }
    printValues() {
        console.log("Principal: " + this.principal);
        console.log("Interest rate: " + this.rate);
        console.log("Time: " + this.time);
    }
}
