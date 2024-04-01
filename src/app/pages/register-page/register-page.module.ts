import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "primeng/api";
import {SharedPrimeNgModules} from "../../../shared/modules/SharedPrimeNgModules";
import {CoreModule} from "../../core/core.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedPrimeNgModules,
    CoreModule
  ]
})
export class RegisterPageModule { }