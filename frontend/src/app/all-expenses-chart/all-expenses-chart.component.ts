import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart , registerables} from 'chart.js';

@Component({
  selector: 'app-all-expenses-chart',
  templateUrl: './all-expenses-chart.component.html',
  styleUrls: ['./all-expenses-chart.component.css']
})
export class AllExpensesChartComponent implements OnInit, AfterViewInit, OnChanges{
  

  @Input() data: any;
  private chart: Chart<'pie', number[], unknown> | null = null

  constructor() {
    Chart.register(... registerables);
  }


  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    if(this.chart)
    this.createChart();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    if(this.data) this.createChart();
  }


  createChart() {
    const ctx = (document.getElementById('expenseChart') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctx!!, {
      type: 'pie',
      data: {
        labels: this.data.map((item: { budget: { title: any; }; }) => item.budget.title),
        datasets: [{
          data: this.data.map((item: { totalExpense: any; }) => item.totalExpense),
          backgroundColor: this.data.map((item: { budget: { color: any; }; }) => item.budget.color)
        }]
      },
      options: {
        responsive: true
      }
    });
  }

}
