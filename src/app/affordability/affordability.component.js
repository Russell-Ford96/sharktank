"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AffordabilityComponent = (function () {
    function AffordabilityComponent() {
        this.savings = 0;
        this.monthlyIncome = 0;
        this.monthlyExpenses = 0;
        this.itemCost = 0;
    }
    AffordabilityComponent.prototype.onKey = function (event) {
        if (event.target.id == "incomeInput")
            this.monthlyIncome = event.target.value;
        else if (event.target.id == "inputSavings")
            this.savings = event.target.value;
        else if (event.target.id == "expenseInput")
            this.monthlyExpenses = event.target.value;
        else if (event.target.id == "affordInput")
            this.itemCost = event.target.value;
    };
    AffordabilityComponent.prototype.canAfford = function (event) {
        event.preventDefault();
        var netIncome = this.monthlyIncome - this.monthlyExpenses;
        if ((netIncome - this.itemCost) > 0) {
            alert("Yes, you can afford it based on your current income");
        }
        else if ((netIncome - this.itemCost + this.savings) > 0) {
            alert("Yes, but at the cost of your savings. Consider waiting.");
        }
        else {
            alert("No, we strongly advise waiting");
        }
    };
    AffordabilityComponent.prototype.printValues = function () {
        console.log("Savings: " + this.savings);
        console.log("monthlyIncome: " + this.monthlyIncome);
        console.log("monthlyExpenses: " + this.monthlyExpenses);
        console.log("itemCost: " + this.itemCost);
    };
    return AffordabilityComponent;
}());
AffordabilityComponent = __decorate([
    core_1.Component({
        selector: 'afford-calc',
        templateUrl: './affordability.component.html',
    })
], AffordabilityComponent);
exports.AffordabilityComponent = AffordabilityComponent;
//# sourceMappingURL=affordability.component.js.map