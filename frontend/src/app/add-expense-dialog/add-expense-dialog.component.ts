import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BudgetsService } from '../services/budgets.service';
import { Budget } from '../models/Budget';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.css']
})
export class AddExpenseDialogComponent implements OnInit{

  addExpenseForm: FormGroup;

  allBudgets: Budget[] = []

  @Output() newExpense = new EventEmitter<any>();

  constructor( private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    private budgetService: BudgetsService) {
      this.addExpenseForm = new FormGroup({
        amount: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        budget: new FormControl('', Validators.required)
      });

      this.budgetService.getBudgets().subscribe(res => {
        this.allBudgets = res.data;
      })

    }


  ngOnInit(): void {
    this.addExpenseForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      budget: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.addExpenseForm.valid) {
      const newExpense = {
        amount: Number(this.addExpenseForm.value.amount),
        description: this.addExpenseForm.value.description,
        budget: this.addExpenseForm.value.budget
        
      };


      this.newExpense.emit(newExpense);
      this.dialogRef.close(newExpense);
    }
  }


  

}
