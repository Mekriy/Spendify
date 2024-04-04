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
import {SharedPrimeNgModules} from "./shared/modules/SharedPrimeNgModules";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JWTauthInterceptor} from "./core/interceptors/auth.interceptor";

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTauthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
