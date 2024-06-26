import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserInfoPageComponent} from "./user-info-page.component";

const routes: Routes = [
  {
    path: '',
    component: UserInfoPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserInfoPageRoutingModule { }
