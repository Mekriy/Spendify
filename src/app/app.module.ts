import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SidemenuComponent } from './mainpage/sidemenu/sidemenu.component';
import { MaincontentComponent } from './mainpage/maincontent/maincontent.component';
import { ExpensecontentComponent } from './mainpage/maincontent/expensecontent/expensecontent.component';
import { AdditemComponent } from './mainpage/maincontent/additem/additem.component';
import { OverviewComponent } from './mainpage/maincontent/overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    MaincontentComponent,
    SidemenuComponent,
    ExpensecontentComponent,
    AdditemComponent,
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
