import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoTPageRoutingModule } from './video-t-routing.module';

import { VideoTPage } from './video-t.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoTPageRoutingModule
  ],
  declarations: [VideoTPage]
})
export class VideoTPageModule {}
