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
    component: HomePageComponent
  },
  {
    path: 'your-expenses',
    component: YourExpensesPageComponent,
    // loadChildren: () => import('./your-expenses-page/your-expenses-page.module').then(m => m.YourExpensesPageModule)
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'statistic',
    component: StatisticPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'verification-success',
    component: EmailVerificationSuccessComponent
  },
  {
    path: 'verification-failure',
    component: EmailVerificationFailureComponent
  },
  {
    path: 'control-panel',
    component: ControlPanelPageComponent
  },
  {
    path: 'user-info',
    component: UserInfoPageComponent
  },
  {
    path:'profile',
    component: ProfilePageComponent
  },
  {
    path: 'verified-password-reset',
    component: VerifiedPasswordResetComponent
  },
  {
    path: '404',
    component: NotFoundComponent
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
