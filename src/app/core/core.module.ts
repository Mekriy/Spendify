import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import {RouterLink} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {SharedPrimeNgModules} from "../shared/modules/SharedPrimeNgModules";



@NgModule({
  declarations: [
    SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ToastModule,
    SharedPrimeNgModules
  ],
  exports: [
    SideBarComponent
  ]
})
export class CoreModule { }
