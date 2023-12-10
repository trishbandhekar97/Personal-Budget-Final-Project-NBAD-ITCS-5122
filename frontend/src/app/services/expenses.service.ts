import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }


  getExpenses(page: number, limit: number): Observable<any> {
    return this.http.get(`${environment.apiURL}expense?page=${page}&limit=${limit}`, {withCredentials: true});
  }

  addExpense(newExpense: Expense): Observable<any> {
    const {amount, description, budget} = newExpense
    return this.http.post(`${environment.apiURL}expense`, {amount, description, budget}, {withCredentials: true});
  }

  modifyExpense(modifiedExpense: Expense): Observable<any> {
    const { _id, amount, description, budget} = modifiedExpense;
    return this.http.patch<any>(`${environment.apiURL}expense`, { _id, amount, description, budget}, {withCredentials: true});
  }

  deleteExpense(id: String) {
    return this.http.delete<any>(`${environment.apiURL}expense`, {body: {id}, withCredentials: true})
  }
}
