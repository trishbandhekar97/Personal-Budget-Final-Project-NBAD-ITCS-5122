import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpensesChartComponent } from './all-expenses-chart.component';

describe('AllExpensesChartComponent', () => {
  let component: AllExpensesChartComponent;
  let fixture: ComponentFixture<AllExpensesChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllExpensesChartComponent]
    });
    fixture = TestBed.createComponent(AllExpensesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
