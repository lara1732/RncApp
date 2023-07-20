import { ChangeDetectorRef, Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { Platform } from '@ionic/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { HttpClient } from '@angular/common/http';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
import { register } from 'swiper/element/bundle';
import { AppUpdate } from '@ionic-native/app-update/ngx';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {

  URL_Link ="https://backup.tregional.mx/AbetCloud/";

  constructor(private toast: Toast, private platform: Platform, private storage: Storage, private router:Router, private http: HttpClient, private appUpdate: AppUpdate) {
   this.initializeApp();
  }

  BaseLink(){
    return this.URL_Link;
  }

 /* async autologin(){
    
    await this.storage.create();
    
    let user =  await this.storage.get('login');
    let pass =  await this.storage.get('pass');

    if(user != null && pass != null){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/login']);
    }
  } 
*/

  initializeApp() {
    this.platform.ready().then(async() => {

      await this.storage.create();

      /*const updateUrl = 'https://backup.tregional.mx/app/APK/my_app_update.xml';
        this.appUpdate.checkAppUpdate(updateUrl).then(update => {
          alert("Update Status:  "+update.msg);
        }).catch(error=>{
          alert("Error: "+error.msg);
        });*/
        const updateUrl = 'https://backup.tregional.mx/app/APK/my_app_update.xml';

        // Suponiendo que appUpdate.checkAppUpdate() devuelve una promesa que resuelve con el contenido del archivo XML.
        this.appUpdate.checkAppUpdate(updateUrl)
          .then(updateContent => {
            // Parsear el contenido XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(updateContent, 'text/xml');

            // Obtener los elementos del XML
            const versionElement = xmlDoc.querySelector('version')?.textContent?.toString() || '';
            const nameElement = xmlDoc.querySelector('name')?.textContent?.toString() || '';
            const urlElement = xmlDoc.querySelector('url')?.textContent?.toString() || '';

            if (versionElement && nameElement && urlElement) {
              const currentVersion = '1.1.4'; // Aquí deberías tener la versión actual de la aplicación
              if (parseInt(versionElement) > parseInt(currentVersion)) {
                alert(`Hay una nueva versión disponible: ${nameElement}. Descárgala desde: ${urlElement}`);
              } else {
                alert('La aplicación está actualizada.');
              }
            }else{
              alert('El archivo XML no tiene el formato esperado o falta información importante.');
            }
          })
          .catch(error => {
            alert('Error al obtener información de actualización.');
            console.error(error);
          });

 
      this.platform.resume.subscribe(async () => {

        await this.storage.create();

  

      let user =  await this.storage.get('login');
      let pass =  await this.storage.get('pass');

      if(user != null && pass != null){

        $("#Preloader").show();
        $("#ButtonLogin").attr('disabled','disabled');
        $("#ButtonResetLogin").attr('disabled','disabled');

        $.ajax({
          url: this.URL_Link+'login/singin',
          type:'POST',
          dataType: "text",
          data:{login:user, pass:pass, type:"m"},
          crossDomain: true,
          async: true,
          success:(data) =>{

            var obj = JSON.parse(data);

            if (obj != "") {

              var msg = obj;

              if (msg == 'OK-') {

                $.ajax({
                  url: ('https://backup.tregional.mx/AbetCloud/models/queries/app/identify.php'),
                  type:'POST',
                  dataType: "text",
                  data:{login:user, pass:pass},
                  crossDomain: true,
                  async: false,
                  success:(dataId) =>{
                  
                    this.storage.set("id",dataId);
                    this.permisos(dataId);    
                                 
                    
                  }
                })

                $("#Preloader").hide();
                $("#ButtonLogin").removeAttr('disabled');
                $("#ButtonResetLogin").removeAttr('disabled');

         
              }else if(obj == "IUOP"){
                $("#Preloader").hide();
                $("#ButtonLogin").removeAttr('disabled');
                $("#ButtonResetLogin").removeAttr('disabled');
                Swal.fire({title:'Error', icon:'error', text: 'User or incorrect password',heightAuto:false});
              }else if (obj == "UWOA") {
                $("#Preloader").hide();
                $("#ButtonLogin").removeAttr('disabled');
                $("#ButtonResetLogin").removeAttr('disabled');
                Swal.fire({title:'Error', icon:'error', text: 'User without access to this app',heightAuto:false});
              }else if (obj == "UWAS") {
    
              }
            }
          },error:function(status, textStatus, jqXHR){

            if (status.statusText=="timeout") {

              Swal.fire({   
                title: 'Error',
                text: 'Your device is not connected to internet or your connection is very slow.\n Please try again' ,   
                icon: 'error',   
                heightAuto:false,
                allowOutsideClick: false,
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "No, Cancelar",   
              }).then((result) => {
            if (result.value) {
                $("#Preloader").hide();
                $("#ButtonLogin").removeAttr('disabled');
                $("#ButtonResetLogin").removeAttr('disabled');

                  } 
              });
            }else{
              $("#Preloader").hide();
              $("#ButtonLogin").removeAttr('disabled');
              $("#ButtonResetLogin").removeAttr('disabled');
              Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
            }
    
          }
        });  

      }


        
      });// Fin Pause
    });

  }

  permisos(Id: any){

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPrivilege.php?id='+Id)
      .subscribe((res) => {
        console.log(res)
        
        this.storage.set('p',res);
        
      });
  }

 async LogOut(){
    
    $('#menuId').attr('disabled', 'disabled');
    await this.storage.clear();
    console.log("hola")
    

  }

  async ngOnInit() {
    await this.storage.create();
       

    
  }

 
}
