import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import {TodayExpensesComponent} from "./today-expenses/today-expenses.component";
import {MonthlyOverviewComponent} from "./monthly-overview/monthly-overview.component";
import {CategoryChartComponent} from "./category-chart/category-chart.component";
import {AddExpenseModule} from "../../shared/components/add-expense/add-expense.module";
import {SharedPrimeNgModules} from "../../shared/modules/SharedPrimeNgModules";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TodayExpensesComponent,
    MonthlyOverviewComponent,
    CategoryChartComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    SharedPrimeNgModules,
    AddExpenseModule,
  ],
  exports: [
    TodayExpensesComponent,
    MonthlyOverviewComponent,
    CategoryChartComponent,
  ]
})
export class DashboardPageModule { }
