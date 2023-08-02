import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
import { SearchbarCustomEvent } from '@ionic/angular';
import { Platform  } from '@ionic/angular';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.page.html',
  styleUrls: ['./streams.page.scss'],

})

export class StreamsPage implements OnInit {

  streams:any[]= [];
  versionFront: string

  constructor(private sharedService: SharedService,
    private http: HttpClient, 
    private storage:Storage,
    private streamingMedia: StreamingMedia,
    public navCtrl: NavController, 
    private platform: Platform)
  { 
    this.versionFront = this.sharedService.getVersion();
  }

  backbutton(){
    this.platform.backButton.subscribeWithPriority(9999, () => {
      document.addEventListener('backbutton', function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('back button pressed');
      }, false);
    });
  }  

  async botonbuscarStream(stream: string){    
    let Vstream = stream
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: () => { console.log('Error Stream') },
      orientation: 'portrait',
      shouldAutoClose: true,
      controls: false
    };    
    this.streamingMedia.playVideo(Vstream, options);  
  }

  GetStreams(){
    this.http
    .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_Streams.php')
    .subscribe((res: any) => {
      console.log(res)
      this.streams = res;
    })
  }

  ngOnInit() {
    this.GetStreams();
  }
}
