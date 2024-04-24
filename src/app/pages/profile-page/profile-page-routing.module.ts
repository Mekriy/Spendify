import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProfilePageComponent} from "./profile-page.component";

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule { }
