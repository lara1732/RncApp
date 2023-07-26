import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoTPageRoutingModule } from './video-t-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VideoTPage } from './video-t.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoTPageRoutingModule
  ],
  declarations: [VideoTPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideoTPageModule {}
