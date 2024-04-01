import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentModule } from './main-content/main-content.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainContentModule,
    CoreModule
  ],
  exports: [
    MainContentModule
  ]
})
export class DashboardPageModule { }
