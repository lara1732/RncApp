import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StreamingMedia } from '@awesome-cordova-plugins/streaming-media/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SharedService } from '../shared.service';

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
  canalesS:any=[];
  versionFront:string
  
  constructor(private sharedService: SharedService,
    private http: HttpClient, 
    private storage:Storage, 
    private router:Router,
    public navCtrl: NavController, 
    private platform: Platform,    
    private loadingCtrl: LoadingController)
  {    
    this.versionFront = this.sharedService.getVersion();  
  }
  
  async showLoading() {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 1000,
    });

    loading.present();
  }

  public getInputValue(inputValue:string){
    console.log(inputValue);
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

  //Obtención de las librerias  
  async loadLibrary(){

    let Id =   await this.storage.get('id'); 

    this.http.get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getLibraries.php?id='+Id)
    .subscribe((res: any) => {
      this.library = res;
      console.log(this.library);
    });
  }

  //Obtención de las Plazas
  async loadLocations() {

    let Id =   await this.storage.get('id');  
    let library = await this.storage.get('library')
    let plaza  = await this.storage.get('plaza');
    
      if(plaza == null){
        plaza = [];
      }

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazas_source.php?id='+Id+'&source='+library[0].Privilege)
      .subscribe((res: any) => {
        this.locations = res;        
        console.log(this.locations)

        let restS = res;            
      
          for( var i=0; i < restS.length; i++){
            for(var j=0; j < plaza.length; j++){
              if (plaza[j].PlazaID == restS[i].PlazaID){
                  //coincidencias.push(canal[j]);
                  // rest.push("{selected: true}");
                  restS[i].selected=true;
              }
            }
          } 
      });      
  }  
    
  //Obtención de los Canales
  async loadCanales() {
    
    let Id = await this.storage.get('id');  
    let plaza  = await this.storage.get('plaza');
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
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getChannels.php?id='+Id+'&plaza='+plazas+'&source='+library[0].Privilege)
      .subscribe((res: any) => {
        this.canales = res;        
        console.log(res);
        
          let restS = res;            
      
          for( var i=0; i < restS.length; i++){
            for(var j=0; j < canal.length; j++){
              if (canal[j].ChannelID == restS[i].ChannelID){
                  restS[i].selected=true;
              }
            }
          }  
      });     
  }

  //Obtención de los Spots
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
    library = library[0].Privilege
    console.log(permisos)
    let acceso = await this.storage.get('a');
    console.log(acceso[0].Spots)
    let privilegio;

      if(library == 'Spots'){
        privilegio = acceso[0].Spots;
      }else if(library == 'INE'){
        privilegio = acceso[0].INE;
      } else if(library == 'Transmisiones'){
        privilegio = acceso[0].Transmisiones;
      }

      if(spot == null){
        spot = [];
      }

      for(var i=0; i<canal.length; i++){
        ids.push(canal[i].ChannelID)      
      }

      for(var i=0; i<plazas.length; i++){
        plaza.push("'"+plazas[i].Name+"'")

        if(library == 'INE'){
          plaza.push("'National|'")
        }
      }  
    
    var  adata = {id:ids, p:privilegio, uss:Id, library:library,plaza:plaza}    
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
          console.log(dataId)
            
          let rest = dataId            
    
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
      });
  }

  async botonbuscar(){

    let Id = await this.storage.get('id'); 
    let library = await this.storage.get('library');
    let canal = await this.storage.get('canal')
    let canales= "";

      for(let i=0; i<canal.length;i++){
        canales = canales + "," + canal[i].ChannelID;
      }
      canales = canales.slice(1);
    
    let permisos = await this.storage.get('p');
    permisos = permisos[0].p;

    let spot = await this.storage.get('spot');
    let spots= "'";

      for(let i=0; i<spot.length;i++){
        spots = spots + "','" + spot[i].MediaRef;
      }
      spots = spots.slice(3)+"'";

    let link = 'https://backup.tregional.mx/AbetCloud/models/queries/App/C_getDetections.php?id='+canales+'&s='+spots+'&p='+permisos+'&u='+Id+'&l='+library[0].Privilege;

    this.storage.set('link',link);
    console.log(link)
    this.router.navigate(['/inicio']);
  }

  selectChanged(event: any) { 
    console.log('CHANGED: ', event);
  }

  async ngOnInit() {      
      await this.storage.create();
      this.storage.remove('plaza')
      this.storage.remove('library')
      this.storage.remove('canal')
      this.storage.remove('spot') 
    }
}


