import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CoreModule } from './core/core.module';
import { YourExpensesPageModule } from './pages/your-expenses-page/your-expenses-page.module';
import { StatisticPageModule } from './pages/statistic-page/statistic-page.module';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {SharedPrimeNgModules} from "./shared/modules/SharedPrimeNgModules";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JWTauthInterceptor} from "./core/interceptors/auth.interceptor";
import {AddExpenseModule} from "./shared/components/add-expense/add-expense.module";
import {DashboardPageModule} from "./pages/dashboard-page/dashboard-page.module";
import { NotFoundComponent } from './static-pages/not-found/not-found.component';
import { EmailVerificationSuccessComponent } from './static-pages/email-verification-success/email-verification-success.component';
import { EmailVerificationFailureComponent } from './static-pages/email-verification-failure/email-verification-failure.component';
import { HomePageComponent } from './static-pages/home-page/home-page.component';
import { ControlPanelPageComponent } from './pages/admin/control-panel-page/control-panel-page.component';
import { UserInfoPageComponent } from './pages/admin/user-info-page/user-info-page.component';
import {ControlPanelPageModule} from "./pages/admin/control-panel-page/control-panel-page.module";
import {UserInfoPageModule} from "./pages/admin/user-info-page/user-info-page.module";
import {GoogleMap, MapMarker} from "@angular/google-maps";
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VerifiedPasswordResetComponent } from './static-pages/verified-password-reset/verified-password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundComponent,
    EmailVerificationSuccessComponent,
    EmailVerificationFailureComponent,
    HomePageComponent,
    ControlPanelPageComponent,
    UserInfoPageComponent,
    ProfilePageComponent,
    VerifiedPasswordResetComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        YourExpensesPageModule,
        StatisticPageModule,
        FormsModule,
        SharedPrimeNgModules,
        AddExpenseModule,
        DashboardPageModule,
        ControlPanelPageModule,
        UserInfoPageModule,
        GoogleMap,
        MapMarker
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTauthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
