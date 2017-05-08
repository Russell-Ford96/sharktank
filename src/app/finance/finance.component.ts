import { Component, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'finance',
    templateUrl: './finance.component.html',
})
export class FinanceComponent  { 
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;

    displayChart = false;
    income: number;
    expenses: number;
    purchaseAmount: number;
    downPayment: number;
    apr: number;
    termMonths: number;
    termYears: number;
    displayAffordability: boolean;
    canAfford: string;
    
    onKey(event: any) { // without type info
        if(event.target.id == "incomeInput")
            this.income = event.target.value;
        else if(event.target.id == "purchaseAmount")
            this.purchaseAmount = event.target.value;
        else if(event.target.id == "expensesInput")
            this.expenses = event.target.value;
        else if(event.target.id == "apr")
            this.apr = event.target.value;
        else if(event.target.id == "downPayment")
            this.downPayment = event.target.value;
        else if(event.target.id == "termMonths") {
            this.termMonths = event.target.value;
            this.termYears = this.termMonths / 12;
        } else if(event.target.id == "termYears") {
            this.termYears = event.target.value;
            this.termMonths = this.termYears * 12;
        }
    }
    calculateCosts(event: any) {
        event.preventDefault();
        var monthlyRate = this.apr/100/12;
        var amountOwed = this.purchaseAmount - this.downPayment;
        var monthlyPayment = amountOwed / ((Math.pow((1+monthlyRate), this.termMonths) - 1) / (monthlyRate*Math.pow(1+monthlyRate, this.termMonths)));
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
        this.displayChart=true;
        setTimeout(() => {
            (<any>this.chart).refresh();
        }, 10);
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
