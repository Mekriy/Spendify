import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedPrimeNgModules} from "../../shared/modules/SharedPrimeNgModules";
import {CoreModule} from "../../core/core.module";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedPrimeNgModules
  ]
})
export class VerifiedPasswordResetModule { }
