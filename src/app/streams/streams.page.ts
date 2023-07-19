import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Platform  } from '@ionic/angular';
import { log } from 'console';
@Component({
  selector: 'app-streams',
  templateUrl: './streams.page.html',
  styleUrls: ['./streams.page.scss'],
})
export class StreamsPage implements OnInit {

  canalesS:any=[];
  streamplaza: any =[];
  streamcanal: any =[];
  locations: any = [];  
  canales: any = [];
  flag:any;
  library: any = [];
  streams:any[]= [];
  results: any[] = [];

  constructor(private http: HttpClient, private storage:Storage, private router:Router,private streamingMedia: StreamingMedia,public navCtrl: NavController, private platform: Platform) { }

  ngOnInit() {
    this.GetStreams();
  }

  selectChanged(event: any) { 

    console.log('CHANGED: ', event);

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
    console.log(Vstream)

    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: () => { console.log('Error Stream') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    
    this.streamingMedia.playVideo(Vstream, options);
  
  }

SelectOption(event: any) {
  const selectedOption = event.detail.value;
  this.storage.set("Scanal", selectedOption);
  console.log(selectedOption);
  // Realizar acciones con el valor seleccionado
}


GetStreams(){

  this.http
  .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_Streams.php')
  .subscribe((res: any) => {
    console.log(res)

    this.streams = res;
    this.results = res;
  })
  // $.ajax({
  //   url: ('https://backup.tregional.mx/AbetCloud/models/queries/app/C_Streams.php'),
  //   type:'POST',
  //   dataType:'Json',
  //   crossDomain: true,
  //   async: false,
  //   success:(dataId) =>{
  //     console.log(dataId)
  //     this.streams = dataId;
  //     this.results = dataId;
  //   }
  // })
}

handleInput(event:SearchbarCustomEvent) {
  const query = event.detail.value?.toLowerCase();
  this.streams = this.results.filter(d => d.toLowerCase() .indexOf(query) > -1);
}
}
