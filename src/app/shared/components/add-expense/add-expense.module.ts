import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddExpenseComponent} from "./add-expense.component";
import {AddItemDialogformComponent} from "./add-item-dialogform/add-item-dialogform.component";
import {AddLocationDialogformComponent} from "./add-location-dialogform/add-location-dialogform.component";
import {SharedPrimeNgModules} from "../../modules/SharedPrimeNgModules";
import {GoogleMapsModule, MapMarker} from "@angular/google-maps";

@NgModule({
  declarations: [
    AddExpenseComponent,
    AddItemDialogformComponent,
    AddLocationDialogformComponent
  ],
  imports: [
    CommonModule,
    SharedPrimeNgModules,
    GoogleMapsModule,
    MapMarker
  ],
  exports: [
    AddExpenseComponent,
    AddItemDialogformComponent,
    AddLocationDialogformComponent,
  ]
})
export class AddExpenseModule { }
