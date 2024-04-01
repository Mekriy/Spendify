import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentModule } from './maincontent/maincontent.module';
import { CoreModule } from '../core/core.module';

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
export class MainpageModule { }
