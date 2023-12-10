import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-budget-dialog',
  templateUrl: './edit-budget-dialog.component.html',
  styleUrls: ['./edit-budget-dialog.component.css']
})
export class EditBudgetDialogComponent implements OnInit{

  editForm: FormGroup;
  element: any;

  @Output() elementUpdated = new EventEmitter<any>();
  

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditBudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { 
    this.editForm = new FormGroup({
      title: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
      color: new FormControl('#f00', Validators.required)
    });
  }

  ngOnInit(): void {

    this.element = this.data;
    this.editForm = this.formBuilder.group({
      title: [this.element.title, Validators.required],
      budget: [this.element.budget, Validators.required],
      color: [this.element.color, Validators.required]
    });
  }

  

  onSubmit() {
    if (this.editForm.valid) {
      const updatedElement = {
        _id: this.element._id,
        title: this.editForm.value.title,
        budget: Number(this.editForm.value.budget),
        color: this.editForm.value.color
      };
      console.log(updatedElement)
      this.elementUpdated.emit(updatedElement);
      this.dialogRef.close(updatedElement);
    }
  }

}
