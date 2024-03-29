import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditemComponent } from './additem/additem.component';
import { ExpensecontentComponent } from './expensecontent/expensecontent.component';
import { OverviewComponent } from './overview/overview.component';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { MaincontentComponent } from './maincontent.component';
import { SharedPrimeNgModules } from '../../../shared/modules/SharedPrimeNgModules';
import { AddItemDialogformComponent } from './additem/add-item-dialogform/add-item-dialogform.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MaincontentComponent,
    AdditemComponent,
    ExpensecontentComponent,
    OverviewComponent,
    CategoryChartComponent,
    AddItemDialogformComponent,
  ],
    imports: [
        CommonModule,
        SharedPrimeNgModules,
        FormsModule
    ],
  exports: [
    MaincontentComponent,
    AdditemComponent,
    ExpensecontentComponent,
    OverviewComponent,
    CategoryChartComponent,
    AddItemDialogformComponent,
  ]
})
export class MainContentModule { }
