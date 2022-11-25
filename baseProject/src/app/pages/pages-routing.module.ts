import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CovidComponent } from './covid/covid.component';
import { ImdbComponent } from './imdb/imdb.component';
import { NasaComponent } from './nasa/nasa.component';
import { RailwayComponent } from './railway/railway.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
