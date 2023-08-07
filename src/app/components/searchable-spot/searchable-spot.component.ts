import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
//import { EventEmitter } from 'stream';
import * as $ from "jquery";
import { SharedService } from "../../shared.service"
import { ActionSheetController } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-searchable-spot',
  templateUrl: './searchable-spot.component.html',
  styleUrls: ['./searchable-spot.component.scss'],
})
export class SearchableSpotComponent implements OnChanges {

  @Input() data3: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen3 = false;
  selected3: any[] = [];
  filtered3: any[] = [];

  selectAll: boolean = false;

  constructor(private storage: Storage, 
    private loadingCtrl: LoadingController,  
    public sharedService: SharedService,
    private actionSheetController: ActionSheetController) { }
 
  ngOnChanges() {

    this.filtered3 = this.data3;
  }

  async open3(){
    this.isOpen3 = true;
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 3000,
    });

    loading.present();
  }

  cancel3(){
    this.isOpen3 = false;
  }

  select3(){
    const selected = this.filtered3.filter((item) => item.selected);
    this.sharedService.selectedS = selected;
    this.selectedChanged.emit(selected);
    this.isOpen3 = false;
    this.storage.set("spot",selected)

    if(selected.length == 0){
      $("#btnbuscar").attr('disabled','true');
      
    }else{
      $("#btnbuscar").removeAttr('disabled');
      
    }
  }

  toggleSelectAll() {
    this.filtered3.forEach(item => {
      item.selected = this.selectAll;
    });
    this.itemSelected3();
  }

  itemSelected3(){
    const allSelected = this.filtered3.every(item => item.selected);
    this.selectAll = allSelected;
  }

  filter3(event: SearchbarCustomEvent){

    const filter3 = event.detail.value?.toLowerCase();  
    this.filtered3 = this.data3.filter(item => this.leaf(item).toLowerCase().indexOf(filter3) >=0);
  }
  
  leaf = (obj: any) => 
    
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);

    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Ordenar por:',
        buttons: [{
          text: 'Mas Apariciones',
          icon: 'layers-outline',
          handler: () => {
            console.log('Opción 1 seleccionada');
            this.masRepe();
            
          }
        },
        // {
        //   text: 'Mas reciente',
        //   icon: 'chevron-up-circle-outline',
        //   handler: () => {
        //     console.log('Opción 1 seleccionada');
        //   }
        // }, {
        //   text: 'Mas antiguo',
        //   icon: 'chevron-down-circle-outline',
        //   handler: () => {
        //     alert('Opción 2 seleccionada');
        //   }
        // },
        {
          text: 'Confidence mas alto',
          icon: 'thumbs-up-outline',
          handler: () => {
            console.log('Opción 3 seleccionada');
            this.mayMen();
          }
        },
        // {
        //   text: 'Confidence mas bajo',
        //   icon: 'thumbs-down-outline',
        //   handler: () => {
        //     alert('Opción 4 seleccionada');
        //   }
        // },      
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar seleccionado');
          }
        }]
      });
    
      await actionSheet.present();
    }


    //filtros

   async masRepe(){

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
        url: ('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getFilterRepetition.php'),
        type:'POST',
        dataType: "Json",
        data: adata,
        crossDomain: true,
        async: true,
        success:(dataId) =>{        
          console.log(dataId)
          this.filtered3 = dataId 
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

   async mayMen(){     

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
        url: ('http://backup.tregional.mx/AbetCloud/models/queries/app/C_getFilterConfidence.php'),
        type:'POST',
        dataType: "Json",
        data: adata,
        crossDomain: true,
        async: true,
        success:(dataId) =>{        
          console.log(dataId)
          this.filtered3 = dataId 
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

  async ngOnInit() {
    await this.storage.create();  
  }  

  
}
