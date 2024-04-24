import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmailVerificationSuccessComponent} from "./email-verification-success.component";

const routes: Routes = [
  {
    path: '',
    component: EmailVerificationSuccessComponent
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
export class EmailVerificationSuccessRoutingModule { }
