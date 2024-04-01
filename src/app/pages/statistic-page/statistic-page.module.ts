import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticPageComponent } from './statistic-page.component';
import { SharedPrimeNgModules } from '../../../shared/modules/SharedPrimeNgModules';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [
    StatisticPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedPrimeNgModules
  ],
  exports: [
    StatisticPageComponent
  ]
})
export class StatisticPageModule { }
