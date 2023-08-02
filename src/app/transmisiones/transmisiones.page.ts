import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-transmisiones',
  templateUrl: './transmisiones.page.html',
  styleUrls: ['./transmisiones.page.scss'],
})

export class TransmisionesPage implements OnInit {
  
  locationsT: any = [];  
  canalesT: any = [];
  transmisionesplaza:any=[];
  versionFront: string

  constructor(private http: HttpClient, 
    private storage:Storage, private router:Router,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private sharedService: SharedService) 
  {
    this.versionFront = this.sharedService.getVersion()
  }

  async loadLocationsT() {

    let Id =   await this.storage.get('id');   

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazasTransmision.php?uss='+Id)
      .subscribe((res: any) => {
        this.locationsT = res;
        console.log(this.locationsT)
      });      
  }

  async loadCanalesT() {
    
    let Id = await this.storage.get('id');  
    let plaza  = await this.storage.get('plaza');
    let plazas = "";

      for(let i=0; i<plaza.length;i++){
        plazas = plazas + ",'" + plaza[i].Plaza+"'";
      }      
      plazas = plazas.slice(1);
      console.log(plazas)
    
    let canal = await this.storage.get('canal');    

      if(canal == null){
        canal = [];
      }      
    
    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getChannels.php?plaza='+plazas+'&id='+Id+'&source=Transmision')
      .subscribe((res: any) => {
        this.canalesT = res;        
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

  async botonbuscar(){
  
    
    let Id = await this.storage.get('id');  
    let permisos = await this.storage.get('p');
    permisos = permisos[0].p;

    let canal = await this.storage.get('canal')
    let canales= "";

      for(let i=0; i<canal.length;i++){
        canales = canales + "," + canal[i].ChannelID;
      }
      canales = canales.slice(1);
 
    let link = 'https://backup.tregional.mx/AbetCloud/models/queries/app/C_getTransmisiones.php?id='+canales+'&p='+permisos+'&u='+Id;
    
    this.storage.set('link',link);
    this.router.navigate(['/calendar']);

  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 4000,
    });

    loading.present();
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
