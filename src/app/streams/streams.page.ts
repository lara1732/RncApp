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

  @Input() data6: any[] = [];
  @Input() data5: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
 @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
  
  selectTabs= 'Detecciones';
  isOpen6 = false;
  selected6: any[] = [];
  filtered6: any[] = [];
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

  filtroStream(){
    $("#filtroStream").removeAttr('hidden');
    $("#filtroSpot").attr('hidden', 'true');
    $("#btnbuscar").attr('hidden', 'true');
    $("#btnbuscarStream").removeAttr('hidden');
    this.flag=2;

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

  select6(){
    const selected = this.data6.filter((item) => item.selected);
    this.selected6 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen6 = false;
    this.storage.set("Cstream",selected);
    console.log(selected)
    }

    itemSelected6(){
      this.selected6 = this.data6.filter((item) => item.selected);
  
      if(!this.multiple && this.selected6.length) {
        const selected = this.data6.filter((item) => item.selected);
        this.selected6 = selected;
        this.selectedChanged.emit(selected);
        this.isOpen6 = false;
        this.storage.set("Cstream",selected);
        this.selectedChanged.emit(this.selected6)
      
      //  this.isOpen6 = false;
        //this.data.map((item) => (item.selected = false));
        
      }
    }

async botonbuscarStream(){
  let Vstream = await this.storage.get('Scanal');
  console.log(Vstream);

  for(let i=0; i<this.streamcanal.length; i++){
      if(Vstream == this.streamcanal[i].Name){
        let options: StreamingVideoOptions = {
          successCallback: () => { console.log('Video played') },
          errorCallback: () => { console.log('Error Stream') },
          orientation: 'landscape',
          shouldAutoClose: true,
          controls: false
        };
        
        this.streamingMedia.playVideo(this.streamcanal[0].Stream, options);
      }
  }
 
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
      this.locations = res;        
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
    plazas = plazas + "," + plaza[i].PlazaID;
  }
  plazas = plazas.slice(1);

  this.http
    .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getChannels.php?id='+Id+'&plaza='+plazas+'&source='+library[0].val)
    .subscribe((res: any) => {
     this.canales = res; 
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