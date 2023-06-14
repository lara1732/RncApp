import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
selectTabs= 'Detecciones';
  locations: any = [];  
  canales: any = [];
  spots: any = [];
  library: any = [];
 flag:any;

 streamplaza: any =[];
 streamcanal: any =[];
  constructor(private http: HttpClient, private storage:Storage, private router:Router,private streamingMedia: StreamingMedia,public navCtrl: NavController, private platform: Platform) {

    this.backbutton();
    
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
  filtroSpot(){
    $("#filtroSpot").removeAttr('hidden');
    $("#filtroStream").attr('hidden', 'true');
    $("#btnbuscarStream").attr('hidden', 'true');
    $("#btnbuscar").removeAttr('hidden');
    this.flag=1;
    
  }
  filtroStream(){
    $("#filtroStream").removeAttr('hidden');
    $("#filtroSpot").attr('hidden', 'true');
    $("#btnbuscar").attr('hidden', 'true');
    $("#btnbuscarStream").removeAttr('hidden');
    this.flag=2;

  }
  async loadLocations() {

    let Id =   await this.storage.get('id');  
    let library = await this.storage.get('library')
    console.log(library)

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazas_source.php?id='+Id+'&source='+library[0].val)
      .subscribe((res: any) => {
        this.locations = res;
        this.streamplaza = res;
        console.log(this.streamplaza)
      });
  
      

  }
  
    
  async loadCanales() {
    
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
       
       /* let restS = res;
            
    
        for( var i=0; i < restS.length; i++){
          for(var j=0; j < canal.length; j++){
            if (canal[j].ChannelID == restS[i].ChannelID){
                //coincidencias.push(canal[j]);
                // rest.push("{selected: true}");
                 restS[i].selected=true;
            }
          }
        }  */      
      });
     
  }

  async loadSpots(){
    
    let plazas = await this.storage.get('plaza')
    let canal = await this.storage.get('canal')
    let Id = await this.storage.get('id');  
    let permisos = await this.storage.get('p');
    permisos = permisos[0].p;
    let plaza = [];
    let ids = [];
    let spot = await this.storage.get('spot');
    let library = await this.storage.get('library');
    library = library[0].val

    if(spot == null){
      spot = [];
    }


    for(var i=0; i<canal.length; i++){
      ids.push(canal[i].ChannelID)      
    }

    for(var i=0; i<plazas.length; i++){
      plaza.push("'"+plazas[i].Plaza+"'")
    } 
     
    
    var  adata = {id:ids, p:permisos, uss:Id, library:library,plaza:plaza}
    console.log(adata);
      $.ajax({
        url: ('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getSpots.php'),
        type:'POST',
        dataType: "Json",
        data: adata,
        crossDomain: true,
        async: true,
        success:(dataId) =>{        
          this.spots = dataId;
            
          let rest = dataId;
            
    
        for( var i=0; i < rest.length; i++){
          for(var j=0; j < spot.length; j++){
            if (spot[j].MediaRef == rest[i].MediaRef){
                //coincidencias.push(canal[j]);
                // rest.push("{selected: true}");
                 rest[i].selected=true;
            }
          }
        } 
          
          
          
        }
      })

  }

  async loadLibrary(){

    const library = [

      {val: "Spots", value: "Spots"},
      {val: "INE", value: "INE"}

    ]
    this.library = library;

  

  }

  selectChanged(event: any) { 

    console.log('CHANGED: ', event);


  }

async  botonbuscar(){

    let plazas = await this.storage.get('plaza')    
    let canal = await this.storage.get('canal')
    let Id = await this.storage.get('id');  
    let permisos = await this.storage.get('p');
    permisos = permisos[0].p;
    let spot = await this.storage.get('spot');
    let library = await this.storage.get('library');


    let canales= "";

    for(let i=0; i<canal.length;i++){
      canales = canales + "," + canal[i].ChannelID;
    }
    canales = canales.slice(1);

    let spots= "'";

    for(let i=0; i<spot.length;i++){
      spots = spots + "','" + spot[i].MediaRef;
    }
    spots = spots.slice(3)+"'";
 
    let link = 'https://backup.tregional.mx/AbetCloud/models/queries/App/C_getDetections.php?id='+canales+'&s='+spots+'&p='+permisos+'&u='+Id+'&l='+library[0].value;
    this.storage.set('link',link);
    this.router.navigate(['/inicio']);

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
  
  this.streamingMedia.playVideo(Vstream[0].Stream, options);






}
   async ngOnInit() {
  this.filtroSpot()

    await this.storage.create();
    console.log(this.storage.get('id'));
    await this.loadLocations();

    this.storage.remove('plaza')
    this.storage.remove('canal')
    this.storage.remove('spot')
    

  }
  ////////////////////STREAM///////////////////////

  async loadLocationsStream() {

    let Id =   await this.storage.get('id');  
   

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazas.php?uss='+Id)
      .subscribe((res: any) => {
        this.locations = res;        
      });
      

  }


  isOpen6 = false;
  selected6: any[] = [];
  filtered6: any[] = [];
  @Input() data6: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';

  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
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
