import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../shared/services/expense.service";
import {LastFiveExpenses} from "../../../shared/interfaces/last-five-expenses";

@Component({
  selector: 'app-today-expenses',
  templateUrl: './today-expenses.component.html',
  styleUrl: './today-expenses.component.scss'
})
export class TodayExpensesComponent implements OnInit{
  lastFiveData!: LastFiveExpenses[] | null;
  noData: boolean = false;

  constructor(private readonly expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getLastTodayFiveExpenses()
      .subscribe({
        next: value => this.lastFiveData = value,
        error: err => {
          this.lastFiveData = null;
          this.noData = true;
        }
      })
  }
}
