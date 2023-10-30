import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";
import { Platform } from '@ionic/angular';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
import { AlertController } from '@ionic/angular';
import { SharedService } from './shared.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],  
})

export class AppComponent {

  URL_Link ="https://backup.tregional.mx/AbetCloud/";
  versionCheck: any
  appVersion: any
  versionfront: string

  constructor(private sharedService: SharedService, 
    private toast: Toast, 
    private platform: Platform, 
    private storage: Storage, 
    private alertCtrl: AlertController,
    private location: Location)
  {      
      this.initializeApp();
      this.versionfront = this.sharedService.getVersion();
      // this.puebaString();
      // this.checkVersion();  
  }

  BaseLink(){
    return this.URL_Link;
  }

  puebaString(){
    $.ajax({
      url: ('https://backup.tregional.mx/abetcloud/models/queries/app/version.php'),
      type:'GET',
      dataType: "text",
      crossDomain: true,
      async: false,
      success:(version) =>{       
        this.versionCheck = version;          
      }
    })

    const searchTerm = "version";
    const index = this.versionCheck.indexOf(searchTerm);
    const suma = index + searchTerm.length + 3; 

      if (index !== -1) {
        this.appVersion = this.versionCheck.substring(suma, suma+5);      
       
        // this.backVersion = textAfterSearchTerm;
        console.log(this.appVersion)
      }else {
        console.log(`La palabra "${searchTerm}" no se encontró en el string.`);
      }
  }

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: '¡Alerta!',
      message: 'Tu aplicación está desactualizada. Por favor actualiza tu aplicación',
      backdropDismiss: false,
      buttons: [       
        {
          text: 'Actualizar',
          cssClass: 'link-button',
          handler: () => {
            console.log('Enlace presionado');
            // Aquí puedes agregar la lógica para redirigir a otra página o sitio web
            window.open("https:\/\/play.google.com\/store\/apps\/details?id=com.abet.movil"); // Abre el enlace en una nueva ventana
          }
        }
      ]
    });

    await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, () => {
        // Verificar la ruta actual
        if (this.location.isCurrentPathEqualTo('/login')) {
          // Si la ruta actual es "/home", no hacer nada (evitar navegación)
          (navigator as any).app.exitApp();
        }
           
             
      });
    });
  }

  async checkVersion(){
    console.log(this.versionfront, this.appVersion);

    if(this.versionfront >= this.appVersion){
      this.toast.show('Tu aplicación está actualizada', '10000', 'center').subscribe(
      toast => {
      console.log(toast);
      }
      );
    }else{
      this.mostrarAlerta();
    }
  }

 async LogOut(){    
    $('#menuId').attr('disabled', 'disabled');
    await this.storage.clear();
    console.log("Adíos")  
  }

  async ngOnInit() {
    await this.storage.create();     
  } 
}
