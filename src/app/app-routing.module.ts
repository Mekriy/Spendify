import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { YourExpensesPageModule } from './pages/your-expenses-page/your-expenses-page.module';
import { YourExpensesPageComponent } from './pages/your-expenses-page/your-expenses-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {LogOutput} from "concurrently";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";

const routes: Routes = [
  {
    path: '',
    component: YourExpensesPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    // loadChildren: () => import('./your-expenses-page/your-expenses-page.module').then(m => m.YourExpensesPageModule)
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
