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
var ng2_charts_1 = require("ng2-charts");
var InterestComponent = (function () {
    function InterestComponent() {
        this.principal = 0;
        this.rate = 0;
        this.time = 0;
        this.annualContribution = 0;
        this.displayChart = null;
        this.barChartLegend = true;
        this.barChartType = 'bar';
        this.datasets = [
            {
                label: "Compounded Interest",
                data: [0]
            }
        ];
        this.chartColors = [
            {
                backgroundColor: 'rgba(66,134,244,1)',
                borderColor: 'rgba(66,134,244,1)',
                pointBackgroundColor: 'rgba(66,134,244,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(66,134,244,1)',
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
                    }],
                yAxes: [{
                        gridLines: {
                            color: 'rgba(255,255,255,.3)'
                        },
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ffffff'
                        }
                    }]
            },
            legend: {
                labels: {
                    fontColor: '#ffffff'
                }
            }
        };
    }
    InterestComponent.prototype.onKey = function (event) {
        if (event.target.id == "principalInput")
            this.principal = event.target.value;
        else if (event.target.id == "rateInput")
            this.rate = event.target.value;
        else if (event.target.id == "yearsInput")
            this.time = event.target.value;
        else if (event.target.id == "additionInput")
            this.annualContribution = event.target.value;
    };
    InterestComponent.prototype.calculateInterest = function () {
        var _this = this;
        var compoundedInterest = 0;
        var series = 0;
        var data = [];
        var labels = [];
        var currentYear = new Date().getFullYear();
        this.time = Number(this.time);
        for (var i = currentYear; i <= currentYear + this.time; i++) {
            compoundedInterest = (Number(this.principal) * Math.pow((1 + ((Number(this.rate) / 100) / 1)), (1 * i - currentYear)))
                + this.annualContribution * ((Math.pow((1 + ((Number(this.rate) / 100) / 1)), ((1 * i - currentYear))) - 1) / (this.rate / 100));
            console.log("Compounded interest: " + compoundedInterest);
            console.log("series: " + series);
            labels.push(String(i));
            data.push(Number(compoundedInterest.toFixed(2)));
        }
        this.datasets[0]['data'] = data;
        this.labels = labels;
        this.displayChart = true;
        setTimeout(function () {
            _this.chart.refresh();
        }, 10);
    };
    InterestComponent.prototype.printValues = function () {
        console.log("Principal: " + this.principal);
        console.log("Interest rate: " + this.rate);
        console.log("Time: " + this.time);
    };
    return InterestComponent;
}());
__decorate([
    core_1.ViewChild(ng2_charts_1.BaseChartDirective),
    __metadata("design:type", ng2_charts_1.BaseChartDirective)
], InterestComponent.prototype, "chart", void 0);
InterestComponent = __decorate([
    core_1.Component({
        selector: 'interest-calc',
        templateUrl: './interest.component.html',
    })
], InterestComponent);
exports.InterestComponent = InterestComponent;
//# sourceMappingURL=interest.component.js.map