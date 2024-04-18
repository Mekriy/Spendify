import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddExpenseComponent} from "./add-expense.component";
import {AddItemDialogformComponent} from "../add-item-dialogform/add-item-dialogform.component";
import {AddLocationDialogformComponent} from "../add-location-dialogform/add-location-dialogform.component";
import {SharedPrimeNgModules} from "../../modules/SharedPrimeNgModules";
import {GoogleMapsModule, MapMarker} from "@angular/google-maps";
import {AddItemDialogFormModule} from "../add-item-dialogform/add-item-dialog-form.module";
import {AddLocationDialogFormModule} from "../add-location-dialogform/add-location-dialog-form.module";
import {AddCategoryDialogFormModule} from "../add-category-dialog-form/add-category-dialog-form.module";

@NgModule({
  declarations: [
    AddExpenseComponent,
  ],
  imports: [
    CommonModule,
    AddItemDialogFormModule,
    AddLocationDialogFormModule,
    AddCategoryDialogFormModule,
    SharedPrimeNgModules,
  ],
  exports: [
    AddExpenseComponent,
    AddItemDialogFormModule,
    AddLocationDialogFormModule,
    AddCategoryDialogFormModule
  ]
})
export class AddExpenseModule { }
