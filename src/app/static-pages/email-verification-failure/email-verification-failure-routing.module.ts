import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmailVerificationFailureComponent} from "./email-verification-failure.component";

const routes: Routes = [
  {
    path: '',
    component: EmailVerificationFailureComponent
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
export class EmailVerificationFailureRoutingModule { }
