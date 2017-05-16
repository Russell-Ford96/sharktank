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
        this.ROW_SIZE = 3;
        this.shopping = true;
        this.giftCards = false;
        this.travel = false;
        this.points = 3000;
        this.shoppingItems = rewards_list_1.REWARDS.shopping;
        this.shoppingRows = this.convertToRow(rewards_list_1.REWARDS.shopping, this.ROW_SIZE);
        this.giftCardItems = rewards_list_1.REWARDS.giftCards;
        this.giftCardRows = this.convertToRow(rewards_list_1.REWARDS.giftCards, this.ROW_SIZE);
        this.travelItems = rewards_list_1.REWARDS.travel;
        this.travelRows = this.convertToRow(rewards_list_1.REWARDS.giftCards, this.ROW_SIZE);
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
    RedeemComponent.prototype.convertToRow = function (items, rowLength) {
        var arr = [];
        var triple = [];
        for (var i = 1; i <= items.length + 1; i++) {
            triple.push(items[i - 1]);
            if (i % rowLength === 0 || i === items.length) {
                arr.push(triple);
                triple = [];
            }
        }
        console.log(arr.length);
        return arr;
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