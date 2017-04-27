import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'interest-calc',
    templateUrl: './interest.component.html',
})
export class InterestComponent { 
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;
    private principal = 0;
    private rate = 0;
    private time = 0;
    private annualContribution = 0;
    private displayChart:boolean = null;

    onKey(event: any) { // without type info
        if(event.target.id == "principalInput")
            this.principal = event.target.value;
        else if(event.target.id == "rateInput")
            this.rate = event.target.value;
        else if(event.target.id == "yearsInput")
            this.time = event.target.value;
        else if(event.target.id == "additionInput")
            this.annualContribution = event.target.value;
    }

    calculateInterest() {
        let compoundedInterest = 0;
        let series = 0;
        let data = [];
        let labels = [];
        var currentYear = new Date().getFullYear();
        this.time = Number(this.time);
        for(var i = currentYear; i <= currentYear + this.time; i++) {
            compoundedInterest = (Number(this.principal) * Math.pow((1 + ((Number(this.rate)/100)/1)),(1 * i-currentYear)))
                            + this.annualContribution * ((Math.pow((1+((Number(this.rate)/100)/1)),((1 * i - currentYear))) - 1) / (this.rate/100));
            console.log("Compounded interest: " + compoundedInterest);
            console.log("series: " + series);
            labels.push(String(i));
            data.push(Number(compoundedInterest.toFixed(2)));
        }
        this.datasets[0]['data'] = data;
        this.labels = labels;
        this.displayChart=true;
        setTimeout(() => {
            (<any>this.chart).refresh();
        }, 10);
    }
    printValues() {
        console.log("Principal: " + this.principal);
        console.log("Interest rate: " + this.rate);
        console.log("Time: " + this.time);
    }

    public barChartLegend:boolean = true;
    public barChartType:string = 'bar';
    private datasets = [
        {
            label: "Compounded Interest",
            data: [0]
        }
      ];
  private chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(66,134,244,1)',
      borderColor: 'rgba(66,134,244,1)',
      pointBackgroundColor: 'rgba(66,134,244,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(66,134,244,1)',
    }];

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
