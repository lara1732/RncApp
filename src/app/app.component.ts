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



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  URL_Link ="https://backup.tregional.mx/AbetCloud/";

  constructor(/*private toast: Toast,*/private platform: Platform, private storage: Storage, private router:Router, private http: HttpClient) {
  }

  BaseLink(){
    return this.URL_Link;
  }

  async autologin(){
    
    await this.storage.create();
    
    let user =  await this.storage.get('login');
    let pass =  await this.storage.get('pass');

    if(user != null && pass != null){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/login']);
    }
  } 


  initializeApp() {
    this.platform.ready().then(async() => {

      await this.storage.create();

     /* this.toast.show('First Time', '10000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );*/

      

      let user =  await this.storage.get('login');
      let pass =  await this.storage.get('pass');

      if(user != null && pass != null){
        this.router.navigate(['/home']);
      }else{
        

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


                this.router.navigate(['/home']);
         
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

                this.router.navigate(['/home']);
    
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
    }
      this.platform.pause.subscribe(async () => {

        alert("pausa");


        
      });// Fin Pause
      this.platform.resume.subscribe(async () => {

        await this.storage.create();

     /* this.toast.show('First Time', '10000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );*/

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

  LogOut(){
    $('#menuId').attr('disabled', 'disabled');
    this.storage.clear();
    console.log("hola")

  }

 
}
