import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { YourExpensesPageModule } from './pages/your-expenses-page/your-expenses-page.module';
import { YourExpensesPageComponent } from './pages/your-expenses-page/your-expenses-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {LogOutput} from "concurrently";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {NotFoundComponent} from "./static-pages/not-found/not-found.component";
import {
  EmailVerificationSuccessComponent
} from "./static-pages/email-verification-success/email-verification-success.component";
import {
  EmailVerificationFailureComponent
} from "./static-pages/email-verification-failure/email-verification-failure.component";
import {HomePageComponent} from "./static-pages/home-page/home-page.component";
import {ControlPanelPageComponent} from "./pages/admin/control-panel-page/control-panel-page.component";
import {UserInfoPageComponent} from "./pages/admin/user-info-page/user-info-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {VerifiedPasswordResetComponent} from "./static-pages/verified-password-reset/verified-password-reset.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./static-pages/home-page/home-page-routing.module')
      .then(r => r.HomePageRoutingModule),
  },
  {
    path: 'your-expenses',
    component: YourExpensesPageComponent,
    loadChildren: () => import('./pages/your-expenses-page/your-expenses-page-routing.module')
      .then(m => m.YourExpensesPageRoutingModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard-page/dashboard-page-routing.module')
      .then(m => m.DashboardPageRoutingModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./pages/statistic-page/statistic-page-routing.module')
      .then(m => m.StatisticPageRoutingModule)
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register-page/register-page-routing.module')
      .then(r => r.RegisterPageRoutingModule)
  },
  {
    path: 'verification-success',
    loadChildren: () => import('./static-pages/email-verification-success/email-verification-success-routing.module')
      .then(r => r.EmailVerificationSuccessRoutingModule)
  },
  {
    path: 'verification-failure',
    loadChildren: () => import('./static-pages/email-verification-failure/email-verification-failure-routing.module')
      .then(r => r.EmailVerificationFailureRoutingModule)
  },
  {
    path: 'control-panel',
    loadChildren: () => import('./pages/admin/control-panel-page/control-panel-page-routing.module')
      .then(r => r.ControlPanelPageRoutingModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('./pages/admin/user-info-page/user-info-page-routing.module')
      .then(r => r.UserInfoPageRoutingModule)
  },
  {
    path:'profile',
    loadChildren: () => import('./pages/profile-page/profile-page-routing.module')
      .then(r => r.ProfilePageRoutingModule)
  },
  {
    path: 'verified-password-reset',
    loadChildren: () => import('./static-pages/verified-password-reset/verified-password-reset-routing.module')
      .then(r => r.VerifiedPasswordResetRoutingModule)
  },
  {
    path: '404',
    loadChildren: () => import('./static-pages/not-found/not-found-routing.module')
      .then(r => r.NotFoundRoutingModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
