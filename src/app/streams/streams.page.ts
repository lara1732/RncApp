import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-streams',
  templateUrl: './streams.page.html',
  styleUrls: ['./streams.page.scss'],
})
export class StreamsPage implements OnInit {


  
  selectTabs= 'Detecciones';
  isOpen6 = false;
  selected6: any[] = [];
  filtered6: any[] = [];
  data6: any[] = [];
  canalesS:any=[];
  streamplaza: any =[];
  streamcanal: any =[];
  locations: any = [];  
  canales: any = [];
  flag:any;
  library: any = [];

  constructor(private http: HttpClient, private storage:Storage, private router:Router,private streamingMedia: StreamingMedia,public navCtrl: NavController, private platform: Platform) { }

  ngOnInit() {
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



  
  async botonbuscarStream(){

    let Vstream = await this.storage.get('Cstream');
    console.log(Vstream);
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: () => { console.log('Error Stream') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    
    this.streamingMedia.playVideo(Vstream[0].stream, options);
  
  
  
  
  
  
  }

SelectOption(event: any) {
  const selectedOption = event.detail.value;
  this.storage.set("Scanal", selectedOption);
  console.log(selectedOption);
  // Realizar acciones con el valor seleccionado
}

async loadLocationsStream() {

  let Id =   await this.storage.get('id');  
 // let library = await this.storage.get('library')
 // console.log(library)

  this.http
    .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazas.php?uss='+Id)
    .subscribe((res: any) => {
      this.streamplaza = res;  
      console.log(this.streamplaza);    
    });
    

}

async loadCanalesStream() {
    
  let Id = await this.storage.get('id');  
  let plaza  = await this.storage.get('plaza');
  let permisos = await this.storage.get('p');
  let plazas = "";
  
  let canal = await this.storage.get('canal');
  let library = await this.storage.get('library');

  if(canal == null){
    canal = [];
  }

  for(let i=0; i<plaza.length;i++){
    plazas = plazas + ",'" + plaza[i].Name+ "'";
  }
  plazas = plazas.slice(1);

  
  this.http
    .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazasstreams.php?uss='+Id+'&p='+plazas)
    .subscribe((res: any) => {
     
     this.streamcanal = res;
     console.log(this.streamcanal);
      let rest = res;
          
  
      for( var i=0; i < rest.length; i++){
        for(var j=0; j < canal.length; j++){
          if (canal[j].ChannelID == rest[i].ChannelID){
              //coincidencias.push(canal[j]);
              // rest.push("{selected: true}");
               rest[i].selected=true;
          }
        }
      }        
    });
   
}
}