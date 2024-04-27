import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../shared/services/expense.service";
import {MonthlyOverview} from "../../../shared/interfaces/monthly-overview";

@Component({
  selector: 'app-monthly-overview',
  templateUrl: './monthly-overview.component.html',
  styleUrl: './monthly-overview.component.scss'
})
export class MonthlyOverviewComponent implements OnInit{
  constructor(private readonly expenseService: ExpenseService) {}

  data: MonthlyOverview = {
    thisMonth: 0.0,
    previousMonth: 0.0,
    daily: 0.0,
  }

  ngOnInit(){
    this.expenseService.getMonthlyOverview()
      .pipe()
      .subscribe({
        next: value => this.data = value,
      })
  }

}
