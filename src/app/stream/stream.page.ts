import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-stream',
  templateUrl: './stream.page.html',
  styleUrls: ['./stream.page.scss'],
})
export class StreamPage implements OnInit {

  constructor(private streamingMedia: StreamingMedia,private http: HttpClient,private router:Router, public navCtrl: NavController ) { }
stream(){
 /* let options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
   errorCallback: () => { console.log('Error streaming') },
    orientation: 'landscape',
    shouldAutoClose: true,
    controls: false
  };
  this.streamingMedia.playVideo('https://www.youtube.com/watch?v=6beANwmNC6M', options);*/
}

startVideo(){
  let options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: () => { console.log('Error streaming') },
    orientation: 'landscape',
    shouldAutoClose: true,
    controls: false
  };
  
  this.streamingMedia.playVideo('http://192.168.100.150/Abet6/Stream_tmp/atsc/Record1/stream.m3u8', options);



}

   // this.streamingMedia.playVideo('http://189.204.160.227:1935/live/Channel04/playlist.m3u8', options);

streamp()
{
  
}

  ngOnInit() {
  }

}