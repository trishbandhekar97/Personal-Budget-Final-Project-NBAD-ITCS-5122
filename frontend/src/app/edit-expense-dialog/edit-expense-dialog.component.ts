import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BudgetsService } from '../services/budgets.service';
import { Budget } from '../models/Budget';

@Component({
  selector: 'app-edit-expense-dialog',
  templateUrl: './edit-expense-dialog.component.html',
  styleUrls: ['./edit-expense-dialog.component.css']
})
export class EditExpenseDialogComponent implements OnInit{
   

    editExpenseForm: FormGroup;
    allBudgets: Budget[] = []
    element: any;

    @Output() editedExpense = new EventEmitter<any>();


    constructor(private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<EditExpenseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: any,
      private budgetService: BudgetsService) {
        this.editExpenseForm = new FormGroup({
          amount: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          budget: new FormControl('', Validators.required)
        });

      this.budgetService.getBudgets().subscribe(res => {
        this.allBudgets = res.data;
      })

    }



    ngOnInit(): void {
      this.element = this.data;
      console.log(this.element)
      this.editExpenseForm = this.formBuilder.group({
        amount: [this.element.amount, Validators.required],
        description: [this.element.description, Validators.required],
        budget: [this.element.budget._id, Validators.required]
      });
    }


    onSubmit() {
      if(this.editExpenseForm.valid) {
        const updatedExpense = {
        _id: this.element._id,
        amount: Number(this.editExpenseForm.value.amount),
        description: this.editExpenseForm.value.description,
        budget: this.editExpenseForm.value.budget
        };

        this.editedExpense.emit(updatedExpense);
        this.dialogRef.close(updatedExpense);
      }
    }
}
