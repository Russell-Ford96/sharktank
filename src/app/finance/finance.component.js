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
var ng2_charts_1 = require("ng2-charts");
var FinanceComponent = (function () {
    function FinanceComponent(profileService, route) {
        this.profileService = profileService;
        this.route = route;
        this.displayChart = false;
        this.income = 0;
        this.expenses = 0;
        this.barChartLegend = true;
        this.barChartType = 'bar';
        this.datasets = [
            {
                type: 'bar',
                label: "Amount owed",
                data: [10, 20, 30, 40, 50]
            },
            {
                type: 'bar',
                label: "Principal paid",
                data: [10, 20, 30, 40, 50]
            },
            {
                type: 'bar',
                label: "Interest paid",
                data: [100, 90, 80, 70, 60]
            }
        ];
        this.labels = ['2017'];
        this.options = {
            responsive: true,
            scales: {
                xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            fontColor: "#ffffff",
                        },
                        stacked: true
                    }],
                yAxes: [{
                        gridLines: {
                            color: 'rgba(255,255,255,.3)'
                        },
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ffffff'
                        },
                        stacked: true
                    }]
            },
            legend: {
                labels: {
                    fontColor: '#ffffff'
                }
            }
        };
    }
    FinanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.profile = data.profile;
        });
        for (var income in this.profile.income) {
            this.income += this.profile.income[income].income_amount;
        }
        for (var expense in this.profile.expenses) {
            this.expenses += this.profile.expenses[expense].expense_amount;
        }
        console.log(this.profile);
    };
    FinanceComponent.prototype.onKey = function (event) {
        if (event.target.id == "termMonths") {
            this.termMonths = event.target.value;
            this.termYears = this.termMonths / 12;
        }
        else if (event.target.id == "termYears") {
            this.termYears = event.target.value;
            this.termMonths = this.termYears * 12;
        }
    };
    FinanceComponent.prototype.calculateCosts = function (event) {
        var _this = this;
        event.preventDefault();
        var monthlyRate = this.apr / 100 / 12;
        var amountOwed = this.purchaseAmount - this.downPayment;
        var monthlyPayment = amountOwed / ((Math.pow((1 + monthlyRate), this.termMonths) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, this.termMonths)));
        this.displayAffordability = true;
        if (monthlyPayment <= this.income - this.expenses)
            this.canAfford = "You can finance this payment";
        else
            this.canAfford = "You cannot finance this payment";
        var interestPayments = [];
        var interestPaidTotal = new Array();
        var tempInterest;
        var principalPayments = [];
        var principalPaidTotal = new Array();
        var tempPrincipal;
        var owedOverTime = [];
        var labels = [];
        for (var month = 0; month < this.termMonths; month++) {
            labels.push(String(month + 1));
            owedOverTime.push(amountOwed);
            interestPayments.push(amountOwed * monthlyRate);
            principalPayments.push(monthlyPayment - interestPayments[month]);
            tempPrincipal = 0;
            tempInterest = 0;
            for (var i = 0; i <= month; i++) {
                tempPrincipal += principalPayments[i];
                tempInterest += interestPayments[i];
            }
            interestPaidTotal.push(tempInterest);
            principalPaidTotal.push(tempPrincipal);
            amountOwed -= principalPayments[month];
        }
        owedOverTime.push(0);
        this.labels = labels;
        this.datasets[0]['data'] = owedOverTime;
        this.datasets[1]['data'] = principalPaidTotal;
        this.datasets[2]['data'] = interestPaidTotal;
        this.displayChart = true;
        setTimeout(function () {
            _this.chart.refresh();
        }, 10);
    };
    return FinanceComponent;
}());
__decorate([
    core_1.ViewChild(ng2_charts_1.BaseChartDirective),
    __metadata("design:type", ng2_charts_1.BaseChartDirective)
], FinanceComponent.prototype, "chart", void 0);
FinanceComponent = __decorate([
    core_1.Component({
        selector: 'finance',
        templateUrl: './finance.component.html',
    }),
    __metadata("design:paramtypes", [profile_service_1.ProfileService,
        router_1.ActivatedRoute])
], FinanceComponent);
exports.FinanceComponent = FinanceComponent;
//# sourceMappingURL=finance.component.js.map