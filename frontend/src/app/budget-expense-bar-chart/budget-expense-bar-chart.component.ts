import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-budget-expense-bar-chart',
  templateUrl: './budget-expense-bar-chart.component.html',
  styleUrls: ['./budget-expense-bar-chart.component.css']
})
export class BudgetExpenseBarChartComponent implements AfterViewInit, OnChanges{

  @Input() data: any;
  @Input() multiplier: any;
  private chart: Chart<'bar', number[], unknown> | null = null

  constructor() {
    Chart.register(... registerables);
  }

  ngAfterViewInit(): void {
    if(this.chart)
    this.createChart();
  console.log(this.multiplier)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    if(this.data) this.createChart();
  }

  createChart() {

    const ctx = (document.getElementById('budgetExpenseBar') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctx!!, {
      type: 'bar',
      data: {
        labels: this.data.map((item: { budget: { title: any; }; }) => item.budget.title),
        datasets: [
          {
            data: this.data.map((item: { budget: { budget: any; }; }) => item.budget.budget),
            label: "Budget",
            backgroundColor: 'rgba(0, 123, 255, 0.5)'
          },
          {
          data: this.data.map((item: { totalExpense: any; }) => item.totalExpense),
          label: "Expenses",
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

}
