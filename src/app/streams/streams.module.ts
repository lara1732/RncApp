import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StreamsPage } from './streams.page';
import { StreamsPageRoutingModule } from './streams-routing.module';

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
    StreamsPageRoutingModule,
    SearchableCanalComponent,
    SearchableSelectComponent,
    SearchableSpotComponent,
    SearchableLibraryComponent,
    StreamPlazaComponent,
    StreamCanalComponent
  ],
  declarations: [StreamsPage]
})
export class StreamsPageModule {}
