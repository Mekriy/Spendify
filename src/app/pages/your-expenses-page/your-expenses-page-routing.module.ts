import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {YourExpensesPageComponent} from "./your-expenses-page.component";

const routes: Routes = [
  {
    path: '',
    component: YourExpensesPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class YourExpensesPageRoutingModule { }
