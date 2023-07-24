import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoTPage } from './video-t.page';

const routes: Routes = [
  {
    path: '',
    component: VideoTPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoTPageRoutingModule {}
