import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { SharedService } from '../shared.service';
import { File } from '@ionic-native/file/ngx';

const baseUrl = "https://example.com";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPE = "video/mp4";


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  constructor(private storage: Storage,
    private alertCtrl: AlertController,
    private router: Router,
    private sharedService: SharedService,
    private file: File,) { }

  @ViewChild('estadoLabel') estadoLabel: ElementRef;
  src = ''
  title = ''
  start = ''
  end = ''
  description = ''
  contract = ''
  type = ''
  status = ''
  priority = ''
  zoom = 1

  selectedVideo: string; //= "https://res.cloudinary.com/demo/video/upload/w_640,h_640,c_pad/dog.mp4";
  uploadedVideo: string;

  isUploading: boolean = false;
  uploadPercent: number = 0;
 
  

 async onError(error: any) {
    const alert = await this.alertCtrl.create({
      header: '¡Error!',
      message: 'Al cargar el archivo',
      backdropDismiss: false,
      buttons: [       
        {
          text: 'Aceptar',
          cssClass: 'link-button',
          handler: () => {
            console.log('Enlace presionado');
            // Aquí puedes agregar la lógica para redirigir a otra página o sitio web
           this.router.navigate(['/calendar-tickets']) // Abre el enlace en una nueva ventana
          }
        }
      ]
    });

    await alert.present();
  }

//   function openCamera(selection) {

//     var srcType = Camera.PictureSourceType.CAMERA;
//     var options = setOptions(srcType);
//     var func = createNewFileEntry;

//     navigator.camera.getPicture(function cameraSuccess(imageUri) {

//         displayImage(imageUri);
//         // You may choose to copy the picture, save it somewhere, or upload.
//         func(imageUri);

//     }, function cameraError(error) {
//         console.debug("Unable to obtain picture: " + error, "app");

//     }, options);
// }

// function onSuccess(imageURI) {
//     var image = document.getElementById('myImage');
//     image.src = imageURI;
// }

// function onFail(message) {
//     alert('Failed because: ' + message);
// }
  

  subtratZoom(){
    console.log("menos")
    if(this.zoom > 1){
      this.zoom -= 0.5;
    }
  }

  addZoom(){
    console.log("mas")
    this.zoom += 0.5;
  }

  downloadFile(){
    try{
      this.sharedService.getFileFromService(this.src);
      alert("Archivo descargado, verifique dentro de la carpeta de descargas.")
    }catch (error) {
      alert("El archivo no pudo ser descargado en este momento, intente mas tarde.")
    }
  }

  async ngOnInit() {
    this.storage.create();
    this.src =  await this.storage.get('pdf');
    this.title =  await this.storage.get('title');
    this.description =  await this.storage.get('description');
    this.start =  await this.storage.get('start');
    this.end =  await this.storage.get('end');
    this.contract =  await this.storage.get('contract');
    this.type =  await this.storage.get('type');
    this.priority =  await this.storage.get('priority');
    this.status =  await this.storage.get('status');

    $("#titulo").html('<i>Titulo:</i> <p>'+this.title+"</p>")
    $("#desc").html('<i>Descipción:</i> <p>'+this.description+"</p>")
    $("#inicio").html('<i>Fecha inicio:</i> <p>'+this.start+"</p>")
    $("#fin").html('<i>Fecha final:</i> <p>'+this.end+"</p>")
    $("#contract").html('<i>Cliente:</i> <p>'+this.contract+"</p>")
    $("#tipo").html('<i>Tipo:</i> <p>'+this.type+"</p>")
    $("#prioridad").html('<i>Prioridad:</i> <p>'+this.priority+"</p>")
    $("#estado").html('<i>Estado:</i> <p>'+this.status+"</p>")
    
    console.log(this.status)  

  }

}
