import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayExpensesComponent } from './today-expenses/today-expenses.component';
import { MonthlyOverviewComponent } from './monthly-overview/monthly-overview.component';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { MainContentComponent } from './main-content.component';
import { SharedPrimeNgModules } from '../../../shared/modules/SharedPrimeNgModules';
import {FormsModule} from "@angular/forms";
import {AddExpenseModule} from "../../../shared/components/add-expense/add-expense.module";


@NgModule({
  declarations: [
    MainContentComponent,
    TodayExpensesComponent,
    MonthlyOverviewComponent,
    CategoryChartComponent,
  ],
  imports: [
    CommonModule,
    SharedPrimeNgModules,
    FormsModule,
    AddExpenseModule,
  ],
  exports: [
    MainContentComponent,
    TodayExpensesComponent,
    MonthlyOverviewComponent,
    CategoryChartComponent,
  ]
})
export class MainContentModule { }
