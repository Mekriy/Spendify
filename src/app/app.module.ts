import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MainContentModule } from './mainpage/maincontent/maincontent.module';
import { SidemenuComponent } from './mainpage/sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainContentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
