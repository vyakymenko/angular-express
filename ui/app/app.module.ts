import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule,
    CoreModule, HomeModule, SharedModule],
  declarations: [AppComponent]
})
export class AppModule { }
