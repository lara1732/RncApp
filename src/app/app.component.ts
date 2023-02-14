import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  URL_Link ="http://localhost/BACKEND_ISW20/";

  constructor(){}

  BaseLink(){
    return this.URL_Link;
  }

  LogOut(){
    alert("Hola");

  }

}
