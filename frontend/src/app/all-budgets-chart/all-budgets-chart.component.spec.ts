import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBudgetsChartComponent } from './all-budgets-chart.component';

describe('AllBudgetsChartComponent', () => {
  let component: AllBudgetsChartComponent;
  let fixture: ComponentFixture<AllBudgetsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBudgetsChartComponent]
    });
    fixture = TestBed.createComponent(AllBudgetsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
