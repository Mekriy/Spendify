import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { TodayExpensesComponent } from './today-expenses/today-expenses.component';
import { MonthlyOverviewComponent } from './monthly-overview/monthly-overview.component';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { MainContentComponent } from './main-content.component';
import { SharedPrimeNgModules } from '../../../shared/modules/SharedPrimeNgModules';
import { AddItemDialogformComponent } from './add-expense/add-item-dialogform/add-item-dialogform.component';
import {FormsModule} from "@angular/forms";
import { AddLocationDialogformComponent } from './add-expense/add-location-dialogform/add-location-dialogform.component';
import {GoogleMap, MapMarker} from "@angular/google-maps";



@NgModule({
  declarations: [
    MainContentComponent,
    AddExpenseComponent,
    TodayExpensesComponent,
    MonthlyOverviewComponent,
    CategoryChartComponent,
    AddItemDialogformComponent,
    AddLocationDialogformComponent,
  ],
  imports: [
    CommonModule,
    SharedPrimeNgModules,
    FormsModule,
    GoogleMap,
    MapMarker
  ],
  exports: [
    MainContentComponent,
    AddExpenseComponent,
    TodayExpensesComponent,
    MonthlyOverviewComponent,
    CategoryChartComponent,
    AddItemDialogformComponent,
  ]
})
export class MainContentModule { }
