import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import { Budget } from '../models/Budget';
import { EditBudgetDialogComponent } from '../edit-budget-dialog/edit-budget-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { MatTable } from '@angular/material/table';
import { AddBudgetDialogComponent } from '../add-budget-dialog/add-budget-dialog.component';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit{

  @ViewChild('table') table: MatTable<any> | undefined;


  allBudgets : Budget[] = [];
  displayedColumns: string[] = ['title', 'budget', 'color', 'edit', 'delete'];

  constructor(private budgetService: BudgetsService, private dialog: MatDialog) {}


  ngOnInit(): void {
    this.getBudgets();
  }

  onEditClick(element: Budget) {
    

    const dialogRef = this.dialog.open(EditBudgetDialogComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe((updatedElement) => {
      if (updatedElement) {
        

        this.budgetService.modifyBudget(updatedElement).subscribe(res => {
          this.allBudgets = this.allBudgets.map((existingElement: Budget) => {
            
            if (existingElement._id === updatedElement._id) {
              return {
                ...existingElement,
                title: updatedElement.title,
                budget: updatedElement.budget,
                color: updatedElement.color
              };
            }
            return existingElement;
          });
        }, error => {
          Swal.fire({
            title: "Error",
            text: error.error.message,
            icon: 'error'
          })
        })
        this.table?.renderRows();
       
      }
    });

    
  }


  delete(element: Budget) {


    this.budgetService.deleteBudget(element._id!!).subscribe(res => {
      const index = this.allBudgets.findIndex(budget => budget._id === element._id)

      if(index !== -1) this.allBudgets.splice(index, 1)
      this.table?.renderRows();

    }, error => {
      Swal.fire({
        title: "Error",
        text: error.error.message,
        icon: 'error'
      })
    })
  }



  addElement() {

    const dialogRef = this.dialog.open(AddBudgetDialogComponent);

    dialogRef.afterClosed().subscribe(newElement => {
      if(newElement) {
        this.budgetService.addBudget(newElement).subscribe(res => {
          this.getBudgets();
          this.table?.renderRows();
        }, error => {
          Swal.fire({
            title: "Error",
            text: error.error.message,
            icon: 'error'
          })
        })
      }
    })
  }



  getBudgets() {
    this.budgetService.getBudgets().subscribe(res => {
      this.allBudgets = res.data;
      
    })
  }

  

}
