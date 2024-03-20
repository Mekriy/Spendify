import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditemComponent } from './additem/additem.component';
import { ExpensecontentComponent } from './expensecontent/expensecontent.component';
import { OverviewComponent } from './overview/overview.component';



@NgModule({
  declarations: [
    AdditemComponent,
    ExpensecontentComponent,
    OverviewComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MainContentModule { }
