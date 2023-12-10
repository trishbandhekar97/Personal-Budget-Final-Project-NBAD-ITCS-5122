import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  totalBudget: number = 0;
  totalExpenses: number = 0;
  displayedColumns: string[] = ['date', 'amount', 'description', 'budget'];
  expenses = new MatTableDataSource<any>([]);
  budgetPieData = {}
  expensesPieData = {}
  expensesLine = {}
  dashboardFilter: string = "LAST_MONTH";

  

  dashboardFilters = [
    {
      title: "Last month",
      value: "LAST_MONTH"
    },
    {
      title: "Last 3 months",
      value: "LAST_3_MONTH"
    },
    {
      title: "All time",
      value: "ALL_TIME"
    },
  ]

  dashboardForm: FormGroup;



  constructor(private http: HttpClient, private auth: AuthService, private formBuilder: FormBuilder) {
    this.dashboardForm = new FormGroup({
      budget: new FormControl('')
    })
  }


  ngAfterViewInit(): void {
    if (this.budgetPieData) {
    }
  }


  ngOnInit(): void {

    this.dashboardForm = this.formBuilder.group({
      budget: [this.dashboardFilters[0].value]
    })

    this.dashboardForm.get('budget')?.valueChanges.subscribe(value => {
      this.getDashboard(value ?? '');
      this.dashboardFilter = value
    });

    this.getDashboard(this.dashboardForm.get('budget')?.value ?? '');
    
    
  }

  getDashboard(value: any) {
    this.http.get<any>(`${environment.apiURL}dashboard?filter=${value}`, {withCredentials: true}).subscribe(res => {
      this.totalBudget = res.totalBudget
      this.totalExpenses = res.totalExpenses
      this.expenses.data = res.recentExpenses
      this.budgetPieData = res.budgetPie
      this.expensesPieData = res.expensesPie
      this.expensesLine = res.expensesLine
    })
  }


    
}
