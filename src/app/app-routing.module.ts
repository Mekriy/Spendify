import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { YourExpensesPageModule } from './your-expenses-page/your-expenses-page.module';
import { YourExpensesPageComponent } from './your-expenses-page/your-expenses-page.component';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  {
    path: '',
    component: YourExpensesPageComponent,
  },
  {
    path: 'dashboard',
    component: MainpageComponent,
    // loadChildren: () => import('./your-expenses-page/your-expenses-page.module').then(m => m.YourExpensesPageModule)
  },
  {
    path: 'statistic',
    component: StatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
