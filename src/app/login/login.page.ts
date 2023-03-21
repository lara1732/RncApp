import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  BaseUrl = this.Link.BaseLink();
  

  constructor(private Link:AppComponent, private router:Router, private storage:Storage) { }
  
   Login(){

    $('#Preloader').show();
    $('#SaveButtonHome').attr('disabled', 'disabled');

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
                async: true,
                success:(dataId) =>{
                
                 /* var Ob = JSON.parse(dataId);
                  var Id = Ob[0].Id; */

                  this.storage.set("id",dataId);
                  //console.log(this.storage);
                  //console.log(dataId);
                  
                }
              })
                

                $('#Preloader').hide();
                $('#ButtonLogin').removeAttr('disabled');         
              
                this.storage.set('login', UserName);
                this.storage.set('pass', Password); 
                this.storage.get('login');       
                this.router.navigate(['/home']);

                $("UserName").val("");
                $("#Password").val("");
              break;

            case "IUOP":
                  $('#Preloader').hide();
                  $('#ButtonLogin').removeAttr('disabled');
                  Swal.fire({title:'Error', icon:'error', text:'Incorrect user or password', heightAuto:false});
              break;

            case "UWOA":
                  $('#Preloader').hide();
                  $('#ButtonLogin').removeAttr('disabled');
                  Swal.fire({title:'Error', icon:'error', text:'User without acess', heightAuto:false});
              break;

            case "UWAS":
                  $('#Preloader').hide();
                  $('#ButtonLogin').removeAttr('disabled');
                  Swal.fire({title:'Error', icon:'error', text:'User with active session', heightAuto:false});
              break;
          }

        },error:function(/*status, textStatus, jqXHR,errorThrown*/){

         /* if (status.statusText=="timeout") {

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
          }*/
            $('#Preloader').hide();
          $('#ButtonLogin').removeAttr('disabled');

        }
      });
    }else{

        $('#Preloader').hide();
        $('#ButtonLogin').removeAttr('disabled');

      Swal.fire({title:'Warning',icon:'warning',text:'Information incomplete',heightAuto: false});
    }
  }

  async ngOnInit() {
    await this.storage.create();
  }

}
