"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var profile_service_1 = require("../profile/profile.service");
var AffordabilityComponent = (function () {
    function AffordabilityComponent(profileService, route) {
        this.profileService = profileService;
        this.route = route;
        this.savings = 0;
        this.monthlyIncome = 0;
        this.monthlyExpenses = 0;
        this.itemCost = 0;
        this.message = '';
    }
    AffordabilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.profile = data.profile;
        });
        console.log(this.profile);
        for (var income in this.profile.income) {
            this.monthlyIncome += this.profile.income[income].income_amount;
        }
        for (var expense in this.profile.expenses) {
            this.monthlyExpenses += this.profile.expenses[expense].expense_amount;
        }
    };
    AffordabilityComponent.prototype.canAfford = function (event) {
        event.preventDefault();
        var netIncome = this.monthlyIncome - this.monthlyExpenses;
        if ((netIncome - this.itemCost) > 0) {
            this.message = "Yes, you can afford it based on your current income";
        }
        else if ((netIncome - this.itemCost + this.savings) > 0) {
            this.message = "Yes, but at the cost of your savings. Consider waiting.";
        }
        else {
            this.message = "No, we strongly advise waiting";
        }
    };
    return AffordabilityComponent;
}());
AffordabilityComponent = __decorate([
    core_1.Component({
        selector: 'afford-calc',
        templateUrl: './affordability.component.html',
    }),
    __metadata("design:paramtypes", [profile_service_1.ProfileService,
        router_1.ActivatedRoute])
], AffordabilityComponent);
exports.AffordabilityComponent = AffordabilityComponent;
//# sourceMappingURL=affordability.component.js.map