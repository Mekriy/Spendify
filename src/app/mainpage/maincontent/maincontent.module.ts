import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditemComponent } from './additem/additem.component';
import { ExpensecontentComponent } from './expensecontent/expensecontent.component';
import { OverviewComponent } from './overview/overview.component';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { MaincontentComponent } from './maincontent.component';


@NgModule({
  declarations: [
    MaincontentComponent,
    AdditemComponent,
    ExpensecontentComponent,
    OverviewComponent,
    CategoryChartComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MaincontentComponent,
    AdditemComponent,
    ExpensecontentComponent,
    OverviewComponent,
    CategoryChartComponent
  ]
})
export class MainContentModule { }
