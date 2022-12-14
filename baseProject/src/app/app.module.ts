import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterDockComponent } from './footer-dock/footer-dock.component';
import { MapReminderComponent } from './commonComponents/map-reminder/map-reminder.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { SnackbaComponent } from './commonComponents/snackba/snackba.component';
import { RemindersListingComponent } from './commonComponents/reminders-listing/reminders-listing.component';
import { SharedModule } from './shared/shared.module';
import { NumericOnlyDirective } from './directives/numeric-only.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterDockComponent,
    MapReminderComponent,
    SnackbaComponent,
    RemindersListingComponent,
    NumericOnlyDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  exports : [
    NumericOnlyDirective,
  ],
  providers: [DatePipe, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'legacy' } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: Window, useValue: window }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
