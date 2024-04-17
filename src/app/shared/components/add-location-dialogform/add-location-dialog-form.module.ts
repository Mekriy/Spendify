import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedPrimeNgModules} from "../../modules/SharedPrimeNgModules";
import {GoogleMapsModule, MapMarker} from "@angular/google-maps";
import {AddLocationDialogformComponent} from "./add-location-dialogform.component";



@NgModule({
  declarations: [
    AddLocationDialogformComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MapMarker,
    SharedPrimeNgModules,
  ],
  exports: [
    AddLocationDialogformComponent
  ]
})
export class AddLocationDialogFormModule { }
