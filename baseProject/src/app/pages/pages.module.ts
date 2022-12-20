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
import { WeatherComponent } from './weather/weather.component';
import { KanbanloginComponent } from './kanbanlogin/kanbanlogin.component';
import { KanbanComponent } from './kanban/kanban.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ExcelComponent } from './excel/excel.component';


@NgModule({
  declarations: [
    CovidComponent,
    ImdbComponent,
    CalendarComponent,
    NasaComponent,
    RailwayComponent,
    SettingsComponent,
    WeatherComponent,
    KanbanloginComponent,
    KanbanComponent,
    HomeComponent,
    ExcelComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PagesModule { }
