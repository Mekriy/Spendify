import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    SideBarComponent
  ]
})
export class CoreModule { }
