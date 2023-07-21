import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { StreamingMedia } from '@awesome-cordova-plugins/streaming-media/ngx';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SharedService } from './shared.service';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule, FullCalendarModule, HttpClientModule,],
  providers: [SharedService, Toast, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},StreamingMedia],
  bootstrap: [AppComponent],
})
export class AppModule {}
