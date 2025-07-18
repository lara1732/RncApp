import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  BaseUrl = this.Link.BaseLink();
  visible:boolean = true;
  changetype:boolean = true;
  versionFront:string;

  constructor(private Link:AppComponent, 
    private router:Router, 
    private storage:Storage,
    private http: HttpClient, 
    private sharedService: SharedService) 
  { 
    $('#menuId').attr('disabled', 'disabled');
    this.versionFront = this.sharedService.getVersion();
  }

  onEnterKey(event: any){    
    this.Login();
  }

  viewpass(){
    this.visible = !this.visible
    this.changetype= !this.changetype;
  }

  Login(){    

    $('#btn-support').hide();
    $('#Preloader').show();
    $('#SaveButtonHome').attr('disabled', 'disabled');
    $('#menuId').removeAttr('disabled');

    var UserName = $("#UserName").val();
    var Password = $("#Password").val();

    if(UserName!="" && Password!=""){

      $.ajax({
      url: this.BaseUrl+'login/singin',
      type:'POST',
      dataType: "text",
      data:{login:UserName, pass:Password, type:"m"},
      crossDomain: true,
      async: true,
        success:(data) =>{

          $('#btn-support').hide();
          $('#Preloader').hide(); 
          $('#ButtonLogin').removeAttr('disabled');

          var Object = JSON.parse(data);

          switch(Object){

            case "OK-":

              $.ajax({
              url: ('https://backup.tregional.mx/AbetCloud/models/queries/app/identify.php'),
              type:'POST',
              dataType: "text",
              data:{login:UserName, pass:Password},
              crossDomain: true,
              async: false,
                success:(dataId) =>{
                  console.log(dataId)
                  this.storage.set("id",dataId);
                  this.permisos(dataId); 
                  this.acceso(dataId);
                }
              })

              $('#Preloader').hide();
              $('#ButtonLogin').removeAttr('disabled');         

              this.storage.set('login', UserName);
              this.storage.set('pass', Password); 

              this.storage.get('login');       
              this.router.navigate(['/seleccion']);
              
              $('#btn-support').show();
              $("#UserName").val("");
              $("#Password").val("");

              break;

            case "IUOP":

              $('#Preloader').hide();
              $('#ButtonLogin').removeAttr('disabled');
              $('#btn-support').show();
              Swal.fire({title:'Error', icon:'error', text:'Incorrect user or password', heightAuto:false});

              break;

            case "UWOA":

              $('#Preloader').hide();
              $('#ButtonLogin').removeAttr('disabled');
              $('#btn-support').show();
              Swal.fire({title:'Error', icon:'error', text:'User without acess', heightAuto:false});
              
              break;

            case "UWAS":

              $('#Preloader').hide();
              $('#ButtonLogin').removeAttr('disabled');
              $('#btn-support').show();
              Swal.fire({title:'Error', icon:'error', text:'User with active session', heightAuto:false});
              
              break;
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
                } 
              });
            }else{
              Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
            }

            $('#btn-support').show();
            $('#Preloader').hide();
            $('#ButtonLogin').removeAttr('disabled');
          }
      });
    }else{
      $('#Preloader').hide();
      $('#ButtonLogin').removeAttr('disabled');
      $('#btn-support').show();

      Swal.fire({title:'Warning',icon:'error',text:'Information incomplete',heightAuto: false});
    }
  }

  permisos(Id: any){
    console.log(Id);

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPrivilege.php?id='+Id)
      .subscribe((res) => {
        console.log(res)        
        this.storage.set('p',res);        
      });
  }

  acceso(Id: any){
    console.log(Id);

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getAccess.php?id='+Id)
      .subscribe((res) => {
        console.log(res)        
        this.storage.set('a',res);        
      });
  }

  Suport(){
    this.router.navigate(['/addticket']);
  }

  async ngOnInit() {
    await this.storage.create();       
  }
}
