import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransmisionesPage } from './transmisiones.page';

const routes: Routes = [
  {
    path: '',
    component: TransmisionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransmisionesPageRoutingModule {}
