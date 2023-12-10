import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-expense-line',
  templateUrl: './expense-line.component.html',
  styleUrls: ['./expense-line.component.css']
})
export class ExpenseLineComponent implements OnInit, AfterViewInit, OnChanges{

  @Input() data: any;
  private chart: Chart<'line', number[], unknown> | null = null

  constructor() {
    Chart.register(...registerables);
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
  ngOnInit(): void {
    
  }

  createChart() {

    const ctx = (document.getElementById('expenseLine') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctx!!, {
      type: 'line',
      data: {
        labels: this.data.map((item: { date: any; }) => item.date),
        datasets: [{
          data: this.data.map((item: { expense: any; }) => item.expense),
          label: 'Expenses',
          backgroundColor: 'rgba(40, 167, 69, 0.5)', // Light green for area under the line
          borderColor: 'rgba(40, 167, 69, 1)', // Solid green for the line
          pointBackgroundColor: 'rgba(30, 157, 59, 1)', // Slightly darker green for points
          fill: true // Fill the area under the line
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

    
}
