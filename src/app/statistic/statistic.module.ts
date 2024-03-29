import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { SharedPrimeNgModules } from '../../shared/modules/SharedPrimeNgModules';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedPrimeNgModules
  ],
  exports: [
    StatisticComponent
  ]
})
export class StatisticModule { }
