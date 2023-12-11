import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ExpensesComponent } from './expenses/expenses.component';
import { BudgetsComponent } from './budgets/budgets.component'
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from  '@angular/material/icon';
import { EditBudgetDialogComponent } from './edit-budget-dialog/edit-budget-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddBudgetDialogComponent } from './add-budget-dialog/add-budget-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddExpenseDialogComponent } from './add-expense-dialog/add-expense-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { EditExpenseDialogComponent } from './edit-expense-dialog/edit-expense-dialog.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { AllBudgetsChartComponent } from './all-budgets-chart/all-budgets-chart.component';
import { AllExpensesChartComponent } from './all-expenses-chart/all-expenses-chart.component';
import { ExpenseLineComponent } from './expense-line/expense-line.component';
import { BudgetExpenseBarChartComponent } from './budget-expense-bar-chart/budget-expense-bar-chart.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component'
import { MatExpansionModule } from '@angular/material/expansion'
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ExpensesComponent,
    BudgetsComponent,
    EditBudgetDialogComponent,
    AddBudgetDialogComponent,
    AddExpenseDialogComponent,
    EditExpenseDialogComponent,
    AllBudgetsChartComponent,
    AllExpensesChartComponent,
    ExpenseLineComponent,
    BudgetExpenseBarChartComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
