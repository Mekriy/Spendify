import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddCategoryDialogFormComponent} from "./add-category-dialog-form.component";
import {SharedPrimeNgModules} from "../../modules/SharedPrimeNgModules";



@NgModule({
  declarations: [
    AddCategoryDialogFormComponent
  ],
  imports: [
    CommonModule,
    SharedPrimeNgModules,
  ],
  exports: [
    AddCategoryDialogFormComponent
  ]
})
export class AddCategoryDialogFormModule { }
