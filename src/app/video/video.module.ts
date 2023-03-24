import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { VideoPageRoutingModule } from './video-routing.module';

import { VideoPage } from './video.page';
import { VideopopupPage } from '../videopopup/videopopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoPageRoutingModule,
    RouterModule.forChild([

      {
        path:'',
        component: VideoPage
      }
    ])
    
    
  ],
  declarations: [VideoPage, /*VideopopupPage*/],
entryComponents: [VideopopupPage]
})
export class VideoPageModule {
 
} 
