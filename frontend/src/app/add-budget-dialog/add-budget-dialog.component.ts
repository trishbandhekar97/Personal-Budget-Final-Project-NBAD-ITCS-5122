import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-budget-dialog',
  templateUrl: './add-budget-dialog.component.html',
  styleUrls: ['./add-budget-dialog.component.css']
})
export class AddBudgetDialogComponent implements OnInit {

  addForm: FormGroup;

  @Output() newElement = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddBudgetDialogComponent>
    ) {
      this.addForm = new FormGroup({
        title: new FormControl('', Validators.required),
        budget: new FormControl('', Validators.required),
        color: new FormControl('#f00', Validators.required)
      });
    }



  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      budget: ['', Validators.required],
      color: ['', Validators.required]
    });
  }


  onSubmit() {
    if(this.addForm.valid) {
      const newElement = {
        title: this.addForm.value.title,
        budget: Number(this.addForm.value.budget),
        color: this.addForm.value.color
      };

      console.log(newElement);
      this.newElement.emit(newElement);
      this.dialogRef.close(newElement);

    }
  }




}
