import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Budget } from '../models/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  constructor(private http: HttpClient) { }

  getBudgets() {
    return this.http.get<any>(environment.apiURL + 'budget', {withCredentials: true});
  }

  addBudget(newBudget: Budget) {
    const {title, budget, color } = newBudget;
    return this.http.post<any>(environment.apiURL + 'budget', { title, budget, color }, { withCredentials: true });
  }

  modifyBudget(modifiedBudget: Budget) {
    const { _id, title, budget, color } = modifiedBudget;
    return this.http.patch<any>(environment.apiURL + 'budget', { _id, title, budget, color },  { withCredentials: true});
  }

  deleteBudget(id: string) {
    return this.http.delete<any>(environment.apiURL + 'budget', { body: { id }, withCredentials: true });
  }
}
