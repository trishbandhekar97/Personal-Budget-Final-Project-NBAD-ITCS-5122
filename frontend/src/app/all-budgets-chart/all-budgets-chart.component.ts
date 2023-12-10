import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-all-budgets-chart',
  templateUrl: './all-budgets-chart.component.html',
  styleUrls: ['./all-budgets-chart.component.css']
})
export class AllBudgetsChartComponent implements OnInit, AfterViewInit, OnChanges {
  

  @Input() data: any;
  private chart: Chart<'pie', number[], unknown> | null = null;

  constructor() {
    Chart.register(...registerables);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    if (this.data) {
      this.createChart();
    }
  }


  ngOnInit(): void {
   console.log(this.data);
  }

  ngAfterViewInit(): void {
    if(this.chart)
    this.createChart();
  }

  createChart(): void {
   
    
    const ctx = (document.getElementById('budgetPie') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctx!!, {
      type: 'pie',
      data: {
        labels: this.data.labels,
        datasets: this.data.datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      }
    });

  }


}
