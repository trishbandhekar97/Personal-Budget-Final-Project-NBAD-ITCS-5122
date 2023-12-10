import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ExpensesService } from '../services/expenses.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseDialogComponent } from '../add-expense-dialog/add-expense-dialog.component';
import Swal from 'sweetalert2'
import { EditExpenseDialogComponent } from '../edit-expense-dialog/edit-expense-dialog.component';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit{

  displayedColumns: string[] = ['date', 'amount', 'description', 'budget', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);
  totalExpenses = 0;
  expensesPerPage = 5;
  currentPage = 0;
  displayPagination = false;

  @ViewChild('table') table: MatTable<any> | undefined;


  constructor(private expenseService: ExpensesService, private dialog: MatDialog) {}

  fetchExpenses() {
    this.expenseService.getExpenses(this.currentPage, this.expensesPerPage)
      .subscribe(res => {
        
        this.totalExpenses = res.data.totalItems;
        this.dataSource.data = res.data.expenses;

        if(this.totalExpenses > 5) this.displayPagination = true;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex;
    this.expensesPerPage = pageData.pageSize;
    this.fetchExpenses();
  }


  ngOnInit(): void {
    this.fetchExpenses();
    
  }

  addExpense() {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent);

    dialogRef.afterClosed().subscribe(newExpense => {
        if(newExpense) {
          this.expenseService.addExpense(newExpense).subscribe(res => {
            this.fetchExpenses();
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


  onEditClick(element: any) {

    const dialogRef = this.dialog.open(EditExpenseDialogComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(updatedExpense => {
      if(updatedExpense) {
        console.log(updatedExpense)
       this.expenseService.modifyExpense(updatedExpense).subscribe(res => {
        this.fetchExpenses();
        
       }, error => {
        Swal.fire({
          title: "Error",
          text: error.error.message,
          icon: 'error'
        })
       })
       this.table?.renderRows
      }
    })

  }

  delete(element: any) {
    this.expenseService.deleteExpense(element._id!!).subscribe(res => {
      this.fetchExpenses();
      this.table?.renderRows();
    }, error => {
      Swal.fire({
        title: "Error",
        text: error.error.message,
        icon: 'error'
      })
    })
  }



}
