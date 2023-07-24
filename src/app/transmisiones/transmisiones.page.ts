import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-transmisiones',
  templateUrl: './transmisiones.page.html',
  styleUrls: ['./transmisiones.page.scss'],
})

export class TransmisionesPage implements OnInit {
  
  selectTabs= 'Transmisiones';
  locationsT: any = [];  
  canalesT: any = [];
  flag:any;
  transmisionesplaza:any=[];

  constructor(private http: HttpClient, 
    private storage:Storage, private router:Router,
    private streamingMedia: StreamingMedia,
    public navCtrl: NavController,
     private platform: Platform) { }

  async loadLocationsT() {

    let Id =   await this.storage.get('id');  
  

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazas.php?uss='+Id)
      .subscribe((res: any) => {
        this.locationsT = res;
        console.log(this.locationsT)


      });

      
  }


  async loadCanalesT() {
    
    let Id = await this.storage.get('id');  
    let plaza  = await this.storage.get('plaza');
    let plazas = "";
    let canal = await this.storage.get('canal');
    
    

    if(canal == null){
      canal = [];
    }

    for(let i=0; i<plaza.length;i++){
      plazas = plazas + ",'" + plaza[i].Name+"'";
    }
    plazas = plazas.slice(1);
    
    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazasstreams.php?uss='+Id+'&p='+plazas)
      .subscribe((res: any) => {
        this.canalesT = res; 
       
        console.log(res);
        
          let restS = res;            
      
          for( var i=0; i < restS.length; i++){
            for(var j=0; j < canal.length; j++){
              if (canal[j].ChannelID == restS[i].ChannelID){
                  //coincidencias.push(canal[j]);
                  // rest.push("{selected: true}");
                  restS[i].selected=true;
              }
            }
          }  
      });
     
  }




  selectChanged(event: any) { 

    console.log('CHANGED: ', event);


  }

  async botonbuscar(){

    let plazas = await this.storage.get('plaza')    
    let canal = await this.storage.get('canal')
    let Id = await this.storage.get('id');  
    let permisos = await this.storage.get('p');
    permisos = permisos[0].p;



    let canales= "";

    for(let i=0; i<canal.length;i++){
      canales = canales + "," + canal[i].ChannelID;
    }
    canales = canales.slice(1);

    let spots= "'";

 
 
    let link = 'https://backup.tregional.mx/AbetCloud/models/queries/app/C_getTransmisiones.php?id=40,41,42,43&p=0&u=10'+canales+'&p='+permisos+'&u='+Id;
    this.storage.set('link',link);
    this.router.navigate(['/calendar']);

  }


  async ngOnInit() {
      
    await this.storage.create();

    this.storage.remove('plaza')
    this.storage.remove('library')
    this.storage.remove('canal')
    this.storage.remove('spot')     

  }
}
