import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarTicketsPage } from './calendar-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarTicketsPageRoutingModule {}
