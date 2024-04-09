import { Component } from '@angular/core';



@Component({
  selector: 'app-today-expenses',
  templateUrl: './today-expenses.component.html',
  styleUrl: './today-expenses.component.scss'
})
export class TodayExpensesComponent {
  expenses = {
    expensePrice: ['$100.0', '$322.0', '$55.4', '$99.9'],
    expenseDate: ['25/03/2024', '25/03/2024', '25/03/2024', '25/03/2024'],
    expenseCategory: ['Restaurant', "Bills", "Gaming", "Project"]
  }
}
