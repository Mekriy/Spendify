import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddItemDialogformComponent} from "./add-item-dialogform.component";
import {SharedPrimeNgModules} from "../../modules/SharedPrimeNgModules";



@NgModule({
  declarations: [
    AddItemDialogformComponent
  ],
  imports: [
    CommonModule,
    SharedPrimeNgModules,
  ],
  exports: [
    AddItemDialogformComponent
  ]
})
export class AddItemDialogFormModule { }
