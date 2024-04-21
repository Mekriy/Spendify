import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from "../../../core/core.module";
import {SharedPrimeNgModules} from "../../../shared/modules/SharedPrimeNgModules";
import {ControlPanelPageComponent} from "./control-panel-page.component";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedPrimeNgModules
  ]
})
export class ControlPanelPageModule { }
