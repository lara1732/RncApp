import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import * as $ from "jquery";
import Swal from 'sweetalert2';
import {Storage} from '@ionic/storage-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.page.html',
  styleUrls: ['./seleccion.page.scss'],
})
export class SeleccionPage implements OnInit {

  constructor(private Link: AppComponent, private router:Router, private storage: Storage) { }

  ngOnInit() {
  }
R_spots(){
  this.router.navigate(['/home']);
}

R_streams(){
  this.router.navigate(['/streams']);
}
}
