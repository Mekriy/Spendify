import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MainContentModule } from './mainpage/maincontent/maincontent.module';
import { CoreModule } from './core/core.module';
import { YourExpensesPageModule } from './your-expenses-page/your-expenses-page.module';
import { StatisticModule } from './statistic/statistic.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainContentModule,
    CoreModule,
    YourExpensesPageModule,
    StatisticModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
