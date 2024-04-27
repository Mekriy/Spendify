import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ControlPanelPageComponent} from "./control-panel-page.component";

const routes: Routes = [
  {
    path: '',
    component: ControlPanelPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ControlPanelPageRoutingModule { }
