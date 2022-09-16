import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { DatePipe } from '@angular/common';
import { MapDialogHeaderComponent } from './commonComponents/map-dialog-header/map-dialog-header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterDockComponent } from './footer-dock/footer-dock.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapDialogHeaderComponent,
    FooterDockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
