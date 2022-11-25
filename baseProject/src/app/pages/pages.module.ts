import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CovidComponent } from './covid/covid.component';
import { ImdbComponent } from './imdb/imdb.component';
import { MaterialModule } from '../material/material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { NasaComponent } from './nasa/nasa.component';
import { RailwayComponent } from './railway/railway.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    CovidComponent,
    ImdbComponent,
    CalendarComponent,
    NasaComponent,
    RailwayComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule
  ]
})
export class PagesModule { }
