import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideolabService } from '../videolab.service';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { __values } from 'tslib';
import * as $ from "jquery";
@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  //videoList = "https://backup.tregional.mx/AbetCloud/";

  constructor(private modalController: ModalController, private videolabService: VideolabService, private router: Router, private storage:Storage) { }
    video: any [""];
     
    flag=0;
sendURL(){
  var sourceTag = document.createElement('video');
  sourceTag.setAttribute('src', this.video.source);
    sourceTag.setAttribute('type', 'video/mp4');
}
 async touch(int: any){

   
  var player = <HTMLVideoElement>document.getElementById('video')!;
    this.flag = this.flag + int;
    if (this.flag == 1){
        this.flag=0
    }else{

        if (!player.paused) {
            //console.log("Video is playing");
            //console.log(player.currentTime())
            player.pause();
            
        } else {
            //console.log("Video is paused");
            //console.log(player.currentTime())
           await player.play();
            
        }
    }

 }


 recorte(){
  var start = this.video.start
  var player = <HTMLVideoElement>document.getElementById('video')!;
  var tiempoActual = (player.currentTime)
  if(tiempoActual>=(this.video.stop)){

    player.pause();
       
    setTimeout(function(){
      player.currentTime= start+0.5
    },1000);
 
    
  }
  //console.log(player.currentTime)
}



async ngOnInit() {
    await this.storage.create();
  //console.log(this.storage.get("video"));
  
  this.video=await this.storage.get("video");
  
  var sourceTag = <HTMLVideoElement>document.getElementById('video')!;
  sourceTag.setAttribute('src', this.video.source);
  sourceTag.setAttribute('type', 'video/mp4');
  sourceTag.currentTime= this.video.start+0.5
  //document.getElementById("ref").
  $("#ref").html('Referencia: <b>'+this.video.mediaRef+"</b>")
  $("#date").html('Fecha: <b>'+this.video.date+"</b>")
  $("#start").html('Inicio de detección: <b>'+this.video.dateStart+"</b>")
  $("#end").html('Fin de detección: <b>'+this.video.dateEnd+"</b>")
}
 
}
