import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MainContentModule } from './pages/dashboard-page/main-content/main-content.module';
import { CoreModule } from './core/core.module';
import { YourExpensesPageModule } from './pages/your-expenses-page/your-expenses-page.module';
import { StatisticPageModule } from './pages/statistic-page/statistic-page.module';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {SharedPrimeNgModules} from "../shared/modules/SharedPrimeNgModules";

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainContentModule,
    CoreModule,
    YourExpensesPageModule,
    StatisticPageModule,
    FormsModule,
    SharedPrimeNgModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
