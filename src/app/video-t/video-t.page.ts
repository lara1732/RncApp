import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideolabService } from '../videolab.service';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { __values } from 'tslib';
import * as $ from "jquery";
import { Share } from '@capacitor/share';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import { ElementRef } from '@angular/core';
import  {Chart} from 'chart.js/auto';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-video-t',
  templateUrl: './video-t.page.html',
  styleUrls: ['./video-t.page.scss'],
})
export class VideoTPage implements OnInit {

  constructor(private modalController: ModalController, private videolabService: VideolabService, private router: Router, private storage:Storage,
    private actionSheetCtrl: ActionSheetController, private http: HttpClient, private ElementRef: ElementRef) { }

    video: any [""]; 
    flag=0;

    full(){
      var elem = <HTMLVideoElement>document.getElementById('video')!;
    
      if (elem.requestFullscreen) {
          elem.requestFullscreen();
        }
    } 

    doubleClick(): void{
      console.log('hola')
      
    }

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

 async ngOnInit() {

  
  await this.storage.create();
  
  this.video=await this.storage.get("video");
  
  
 }

 async presentActionSheet() { //submenu
  const actionSheet = await this.actionSheetCtrl.create({
   
    buttons: [
      {
        text: 'Full',
        icon:'expand-sharp',
        handler: () => {
          this.full();
        }
      },
     
      {
        text: 'Cancel',
        role: 'cancel',
        icon:'close-circle-sharp',
        data: {
          action: 'cancel',
        },
      },
    ],
  });

  await actionSheet.present();
}

}
