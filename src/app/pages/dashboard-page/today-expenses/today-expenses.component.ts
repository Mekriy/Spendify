import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../shared/services/expense.service";
import {LastFiveExpenses} from "../../../shared/interfaces/last-five-expenses";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-today-expenses',
  templateUrl: './today-expenses.component.html',
  styleUrls: ['./today-expenses.component.scss']
})
export class TodayExpensesComponent implements OnInit{
  lastFiveData!: LastFiveExpenses[] | null;
  noData: boolean = false;

  constructor(private readonly expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getLastTodayFiveExpenses()
      .pipe(
        catchError(error => {
          console.log("error: ", error)
          if(error.status === 404){
            this.noData = true;
          }
          return of(error)
        })
      )
      .subscribe({
        next: value => {
          this.lastFiveData = value;
        },
        error: err => {
          this.noData = true;
        }
      })
  }
}
