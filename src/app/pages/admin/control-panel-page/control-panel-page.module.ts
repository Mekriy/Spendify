import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from "../../../core/core.module";
import {SharedPrimeNgModules} from "../../../shared/modules/SharedPrimeNgModules";
import {ControlPanelPageComponent} from "./control-panel-page.component";
import {
  AddCategoryDialogFormModule
} from "../../../shared/components/add-category-dialog-form/add-category-dialog-form.module";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedPrimeNgModules,
    AddCategoryDialogFormModule
  ]
})
export class ControlPanelPageModule { }
