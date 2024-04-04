import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { SharedPrimeNgModules } from '../../shared/modules/SharedPrimeNgModules';
import { YourExpensesPageComponent } from './your-expenses-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {FormsModule} from "@angular/forms";
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
  declarations: [
    YourExpensesPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedPrimeNgModules,
    GoogleMapsModule,
    FormsModule,
    FileUploadModule
  ],
})
export class YourExpensesPageModule { }
