"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var rewards_list_1 = require("./rewards-list");
var RedeemComponent = (function () {
    function RedeemComponent() {
        this.shopping = true;
        this.giftCards = false;
        this.travel = false;
        this.points = 3000;
        this.shoppingItems = rewards_list_1.REWARDS.shopping;
        this.giftCardItems = rewards_list_1.REWARDS.giftCards;
        this.travelItems = rewards_list_1.REWARDS.travel;
    }
    RedeemComponent.prototype.viewShopping = function () {
        this.resetViews();
        this.shopping = true;
    };
    RedeemComponent.prototype.viewGiftCards = function () {
        this.resetViews();
        this.giftCards = true;
    };
    RedeemComponent.prototype.viewTravel = function () {
        this.resetViews();
        this.travel = true;
    };
    RedeemComponent.prototype.resetViews = function () {
        this.shopping = false;
        this.giftCards = false;
        this.travel = false;
    };
    RedeemComponent.prototype.buyItem = function (points) {
        if (this.points - points >= 0)
            this.points -= points;
        else
            alert("You don't have enough points yet!");
    };
    return RedeemComponent;
}());
RedeemComponent = __decorate([
    core_1.Component({
        selector: 'redeem',
        templateUrl: './redeem.component.html',
    })
], RedeemComponent);
exports.RedeemComponent = RedeemComponent;
//# sourceMappingURL=redeem.component.js.map