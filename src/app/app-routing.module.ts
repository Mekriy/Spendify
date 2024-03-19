import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent
  },
  {
    path:'main-page',
    component: MainPageComponent
  },
  {
    path:'form',
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
