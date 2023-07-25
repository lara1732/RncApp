import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { VideoPageRoutingModule } from './video-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VideoPage } from './video.page';



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
  declarations: [VideoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class VideoPageModule {
 
} 
