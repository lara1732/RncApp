import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { Platform } from '@ionic/angular';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.page.html',
  styleUrls: ['./seleccion.page.scss'],
})

export class SeleccionPage implements OnInit {

  versionFront:string

  constructor(private sharedService: SharedService, 
    private router:Router,
    private platform: Platform) 
  {   
    this.versionFront = this.sharedService.getVersion();
  }

  ngOnInit() {
  }

  slides = [
    {
      img: '../assets/icon/spots.png'
    },

    {
      img: '../assets/icon/streams.png'
    },
    {
      img: '../assets/icon/transmisiones.png'
    },
    {
      img: '../assets/icon/contratos.png'
    },

  ];
  
  R_spots(){
    this.router.navigate(['/home']);
  }

  R_streams(){
    this.router.navigate(['/streams']);
  }

  R_transmisiones(){
    this.router.navigate(['/transmisiones']);
  }

  R_contratos(){
    Swal.fire({title:'Error', icon:'error', text:'No disponible', heightAuto:false});
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
}
