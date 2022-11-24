import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemindersListingComponent } from './commonComponents/reminders-listing/reminders-listing.component';

const routes: Routes = [
  {
    path : 'pages/reminders',
    component : RemindersListingComponent
  },
  {
    path : 'pages',
    loadChildren : () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
