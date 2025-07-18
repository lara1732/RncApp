import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SearchableSelectComponent } from '../components/searchable-select/searchable-select.component';
import { SearchableCanalComponent } from '../components/searchable-canal/searchable-canal.component';
import { SearchableSpotComponent } from '../components/searchable-spot/searchable-spot.component';
import { SearchableLibraryComponent } from '../components/searchable-library/searchable-library.component';
import { StreamPlazaComponent } from '../components/stream-plaza/stream-plaza.component'; 
import { StreamCanalComponent } from '../components/stream-canal/stream-canal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SearchableCanalComponent,
    SearchableSelectComponent,
    SearchableSpotComponent,
    SearchableLibraryComponent,
    StreamPlazaComponent,
    StreamCanalComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
