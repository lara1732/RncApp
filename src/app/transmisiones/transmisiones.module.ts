import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransmisionesPlazaComponent } from '../components/transmisiones-plaza/transmisiones-plaza.component'; 
import { TransmisionesCanalComponent } from '../components/transmisiones-canal/transmisiones-canal.component';

import { IonicModule } from '@ionic/angular';

import { TransmisionesPageRoutingModule } from './transmisiones-routing.module';

import { TransmisionesPage } from './transmisiones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransmisionesPageRoutingModule,
    TransmisionesCanalComponent,
    TransmisionesPlazaComponent
  ],
  declarations: [TransmisionesPage]
})
export class TransmisionesPageModule {}
