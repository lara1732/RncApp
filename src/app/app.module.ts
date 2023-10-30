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
import { SearchableSpotComponent } from './components/searchable-spot/searchable-spot.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { File } from '@ionic-native/file/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    SearchableSpotComponent,
    PdfViewerModule,
  ],
  providers: [
    Toast,
    SMS,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StreamingMedia,
    File,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
