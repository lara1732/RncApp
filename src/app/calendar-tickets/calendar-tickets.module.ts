import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';

import { IonicModule } from '@ionic/angular';

import { CalendarTicketsPageRoutingModule } from './calendar-tickets-routing.module';

import { CalendarTicketsPage } from './calendar-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullCalendarModule,
    CalendarTicketsPageRoutingModule
  ],
  declarations: [CalendarTicketsPage]
})
export class CalendarTicketsPageModule {}
