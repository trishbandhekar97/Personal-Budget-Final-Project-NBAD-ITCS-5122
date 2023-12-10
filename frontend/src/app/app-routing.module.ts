import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { authGuard } from './guards/auth.guard';





const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate: []
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: []
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'budgets',
    component: BudgetsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
