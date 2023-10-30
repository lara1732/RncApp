import { Component, OnInit} from '@angular/core';
import { SharedService } from '../shared.service';
import * as $ from "jquery";
import { HttpClient } from '@angular/common/http';
import { AppComponent } from "../app.component";
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SMS } from '@ionic-native/sms/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.page.html',
  styleUrls: ['./addticket.page.scss'],
})
export class AddticketPage implements OnInit {

  BaseUrl = this.Link.BaseLink(); 
  versionFront: string;

  constructor(private Link:AppComponent, 
    private router:Router, 
    private storage:Storage,
    private http: HttpClient, 
    private sharedService: SharedService,
    private sms: SMS,
    private emailComposer: EmailComposer,
    private alertController: AlertController)
  {
    this.versionFront = this.sharedService.getVersion();
   }

  onEnterKey(event: any){    
    
  }

  sendEmail(){

    var Email = $('#correo').val();    
    var numeroAleatorio = Math.floor(1000 + Math.random() * 9000); // Genera un número entre 1000 y 9999
    this.storage.set('random', numeroAleatorio);

    if (Email != ""){

      this.presentAlert();
      $('#inputEmail').show();
      $('#btn-verifyEmail').show();
      $('#btn-email').attr('disabled', 'true');

      console.log(numeroAleatorio, Email);

      $.ajax({

        type: "POST",
        url: 'https://backup.tregional.mx/AbetCloud/models/queries/app/Email_SEND.php',
        data: { email: Email, cc : numeroAleatorio },
        success: function(response) {
              console.log(response)
          },
        error: function(xhr, status, error) {
            alert("Error: " + error); // Maneja el error si ocurre
        }
      });
    }else{
      Swal.fire({title:'¡Aviso!',icon:'error',text:'Información incompleta',heightAuto: false});
    }
    
  }

  async verifyEmail(){

    var code = $('#codeEmail').val();
    var cc = await this.storage.get('random');
    console.log(cc, code)
    if (code != "") {
      if (code != cc) {
        Swal.fire({title:'¡Error!',icon:'error',text:'Código de verificación incorrecto',heightAuto: false});
      }else{
        Swal.fire({title:'Éxito',icon:'success',text:'Correo verificado exitosamente',heightAuto: false});

        $('#inputEmail').hide();
        $('#btn-verifyEmail').hide();
        $('#btn-email').hide();
        $('#correo').attr('disabled', 'true');
      }
    }else{
      Swal.fire({title:'¡Aviso!',icon:'error',text:'Información incompleta',heightAuto: false});
    }
   

  }

  sendPhone(){
    $('#inputPhone').show();
    $('#btn-verifyPhone').show();
    $('#btn-phone').attr('disabled', 'true');

    var Phone = $('#telefono').val();
    console.log(Phone);

    $.ajax({
      type: "POST",
      url: 'https://backup.tregional.mx/AbetCloud/models/queries/app/Phone_SEND.php',
      dataType: 'json',
      data: { phone: Phone },
      success: function(response) {
            console.log(response)
        },
      error: function(xhr, status, error) {
          console.log("Error: " + error); // Maneja el error si ocurre
      }
    });
   
  }

  verifyPhone(){
    var Phone = $('#telefono').val();
    var Code = $('#codePhone').val();
    console.log(Phone, Code);

    $.ajax({
      type: "POST",
      url: 'https://backup.tregional.mx/AbetCloud/models/queries/app/Phone_VERIFY.php',
      dataType: 'json',
      data: { phone: Phone, code: Code },
      success: function(response) {
            console.log(response)
        },
      error: function(xhr, status, error) {
          console.log("Error: " + error); // Maneja el error si ocurre
      }
    });
   
  }


  addticket(){

    var title = $("#titulo").val();
    var description = $("#descripcion").val();
    var contract = $("#contrato").val();
    var mail = $("#correo").val();
    var phone = $("#telefono").val();

    var  adata = {title:title, description:description, mail:mail, phone:phone, contractID:contract}

    if (title != "" && description != "" && contract != "" && mail != "" && phone != "") {

      $.ajax({
        url: this.BaseUrl+'models/queries/app/Ticket_ADD.php',
        type:'POST',
        dataType: "text",
        data: adata,
        crossDomain: true,
        async: true,
          success:(data) =>{

            Swal.fire({title:'Success',icon:'success',text:data,heightAuto: false});
            console.log(data);
          
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
      Swal.fire({title:'¡Aviso!',icon:'error',text:'Información incompleta',heightAuto: false});
    }

    console.log(adata);

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Se ha enviado un código a su correo',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
