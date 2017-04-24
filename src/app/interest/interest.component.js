"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var InterestComponent = (function () {
    function InterestComponent() {
        this.principal = 0;
        this.rate = 0;
        this.time = 0;
    }
    InterestComponent.prototype.onKey = function (event) {
        if (event.target.id == "principalInput")
            this.principal = event.target.value;
        else if (event.target.id == "rateInput")
            this.rate = event.target.value;
        else if (event.target.id == "yearsInput")
            this.time = event.target.value;
    };
    InterestComponent.prototype.calculateInterest = function () {
        var compoundedInterest;
        this.printValues();
        for (var i = 0; i < this.time; i++) {
            compoundedInterest = this.principal * Math.pow((1 + ((this.rate / 100) / 1)), (1 * i));
            console.log("Compounded interest: " + compoundedInterest);
        }
    };
    InterestComponent.prototype.printValues = function () {
        console.log("Principal: " + this.principal);
        console.log("Interest rate: " + this.rate);
        console.log("Time: " + this.time);
    };
    return InterestComponent;
}());
InterestComponent = __decorate([
    core_1.Component({
        selector: 'interest-calc',
        templateUrl: './interest.component.html',
    })
], InterestComponent);
exports.InterestComponent = InterestComponent;
//# sourceMappingURL=interest.component.js.map