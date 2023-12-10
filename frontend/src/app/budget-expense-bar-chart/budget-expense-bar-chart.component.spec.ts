import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpenseBarChartComponent } from './budget-expense-bar-chart.component';

describe('BudgetExpenseBarChartComponent', () => {
  let component: BudgetExpenseBarChartComponent;
  let fixture: ComponentFixture<BudgetExpenseBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetExpenseBarChartComponent]
    });
    fixture = TestBed.createComponent(BudgetExpenseBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
