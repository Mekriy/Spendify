import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from "../../../core/core.module";
import {SharedPrimeNgModules} from "../../../shared/modules/SharedPrimeNgModules";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedPrimeNgModules
  ]
})
export class UserInfoPageModule { }
