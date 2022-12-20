import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CovidComponent } from './covid/covid.component';
import { ExcelComponent } from './excel/excel.component';
import { HomeComponent } from './home/home.component';
import { ImdbComponent } from './imdb/imdb.component';
import { KanbanComponent } from './kanban/kanban.component';
import { KanbanloginComponent } from './kanbanlogin/kanbanlogin.component';
import { NasaComponent } from './nasa/nasa.component';
import { RailwayComponent } from './railway/railway.component';
import { SettingsComponent } from './settings/settings.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path : 'covidDashboard',
    component : CovidComponent
  },
  {
    path : 'IMDB',
    component : ImdbComponent
  },
  {
    path : 'calendar',
    component : CalendarComponent
  },
  {
    path : 'nasa',
    component : NasaComponent
  },
  {
    path : 'railway',
    component : RailwayComponent
  },
  {
    path : 'settings',
    component : SettingsComponent
  },
  {
    path : 'weather',
    component : WeatherComponent
  },
  {
    path : 'kanbanLogin',
    component : KanbanloginComponent
  },
  {
    path : 'kanban',
    component : KanbanComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'excel',
    component : ExcelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
