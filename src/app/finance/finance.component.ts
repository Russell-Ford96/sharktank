import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Profile } from '../profile/profile';
import { ProfileService } from '../profile/profile.service'

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'finance',
    templateUrl: './finance.component.html',
})
export class FinanceComponent  { 
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;
    displayChart: boolean = false;

    profile: Profile;
    income: number = 0;
    expenses: number = 0;
    purchaseAmount: number = 0;
    downPayment: number = 0;
    apr: number = 0.0;
    termMonths: number = 0;
    termYears: number;
    displayAffordability: boolean;
    canAfford: string;
    
    constructor(
        private profileService: ProfileService,
        private route: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.route.data
              .subscribe((data: { profile: Profile }) => {
                this.profile = data.profile;
              });
        for(var income in this.profile.income) {
            this.income += this.profile.income[income].income_amount;
        }
        for(var expense in this.profile.expenses) {
            this.expenses += this.profile.expenses[expense].expense_amount;
        }
        console.log(this.profile);
    }

    onKey(event: any) {
        if(event.target.id == "termMonths") {
            this.termMonths = event.target.value;
            this.termYears = this.termMonths / 12;
        } else if(event.target.id == "termYears") {
            this.termYears = event.target.value;
            this.termMonths = this.termYears * 12;
        }
    }
    calculateCosts(event: any) {
        event.preventDefault();
        var amountOwed;
        var monthlyPayment;
        if(this.apr <= 0)
            this.apr = .001;
        var monthlyRate = this.apr/100/12;

        if(this.downPayment >= 0)
            amountOwed = this.purchaseAmount - this.downPayment;
        else
            amountOwed = this.purchaseAmount;
        if(this.termMonths <= 0)
            monthlyPayment = amountOwed;
        else
            monthlyPayment = amountOwed / ((Math.pow((1+monthlyRate), this.termMonths) - 1) / (monthlyRate*Math.pow(1+monthlyRate, this.termMonths)));
        console.log(monthlyPayment);
        this.displayAffordability = true;
        if(monthlyPayment <= this.income - this.expenses)
            this.canAfford = "You can finance this payment";
        else
            this.canAfford = "You cannot finance this payment";
        var interestPayments = [];
        var interestPaidTotal = new Array<number>();
        var tempInterest;
        var principalPayments = [];
        var principalPaidTotal = new Array<number>();
        var tempPrincipal;
        var owedOverTime = [];
        var labels = [];
        for(var month = 0; month < this.termMonths; month++) {
            labels.push(String(month + 1));
            owedOverTime.push(amountOwed);
            interestPayments.push(amountOwed * monthlyRate);
            principalPayments.push(monthlyPayment - interestPayments[month]);
            tempPrincipal = 0;
            tempInterest = 0;
            for(var i = 0; i <= month; i++) {
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
        if(this.termMonths > 0) {
            this.displayChart=true;
            setTimeout(() => {
                (<any>this.chart).refresh();
            }, 10);
        }
    }
    public barChartLegend:boolean = true;
    public barChartType:string = 'bar';
    private datasets = [
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

    private labels = ['2017'];

    private options = {
        responsive: true,
        scales: {
            xAxes: [{ 
                gridLines: {
                    display: false,
                },
                ticks: {
                  fontColor: "#ffffff", // this here
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
