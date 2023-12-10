import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseLineComponent } from './expense-line.component';

describe('ExpenseLineComponent', () => {
  let component: ExpenseLineComponent;
  let fixture: ComponentFixture<ExpenseLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseLineComponent]
    });
    fixture = TestBed.createComponent(ExpenseLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
