import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {VerifiedPasswordResetComponent} from "./verified-password-reset.component";

const routes: Routes = [
  {
    path: '',
    component: VerifiedPasswordResetComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VerifiedPasswordResetRoutingModule { }
