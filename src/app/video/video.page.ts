import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { __values } from 'tslib';
import * as $ from "jquery";
import { Share } from '@capacitor/share';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import { ElementRef } from '@angular/core';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})

export class VideoPage implements OnInit {
  
  constructor(private storage: Storage,
    private actionSheetCtrl: ActionSheetController, 
    private http: HttpClient) 
  {}
    
  @ViewChild('radar') private barCanvas: ElementRef;
    video: any [""]; 
    flag=0;
    radarChart: any;    
    data: any = [];
    
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


  doubleClick(): void{
    console.log('hola')    
  }

  //submenu

  async presentActionSheet() { 
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
          text: 'Compartir',
          icon:'share-social-sharp',
          handler: () => {
            this.compartir();
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

  full(){
    var elem = <HTMLVideoElement>document.getElementById('video')!;

      if (elem.requestFullscreen) {
          elem.requestFullscreen();
      }
  }

  async compartir(){

    let spot = await this.video.ID;
    let Id = await  this.storage.get('id');
    let user = await  this.storage.get('login');
    this.video = await this.storage.get("video");

    Share.share({
      text: 'Aquí tienes el testigo de tu detección '+this.video.mediaRef,
      url: 'https://backup.tregional.mx/Abet6/API3.php?id='+spot+'&us='+Id+'&uss='+user,    
    });
  }

  //Grafica

  async getinformation(){

    let ID = await this.storage.get('id');
    let spot = await this.storage.get('video');
    let plaza  = await this.storage.get('plaza');
    let plazas = "";

      for(let i=0; i<plaza.length;i++){
        plazas = plazas + "," + plaza[i].PlazaID;
      }      
      plazas = plazas.slice(1);

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getRadar.php?mf='+spot.mediaRef+'&us='+ID+'&u='+spot.UUID)
      .subscribe((res: any) => {
        this.data = JSON.stringify(res);
        this.data = this.data.slice(2, -2);     
        this.data = this.data.split(","); 
        console.log(this.data)
        this.chart();
      });     
  }

  async chart(){

    const date = new Date();
    const hoy = date.toLocaleDateString();
    let spot = await this.storage.get('video');

    Chart.register(ChartDataLabels);
    this.radarChart = new Chart("radar", {
      type: 'radar',
      data: {
        labels: [
          'LasEstrellasXHGA',
          'XEWO',
          'CanalCincoXHGUE',
          'XHG'
        ],
        datasets: [{
          label: spot.mediaRef,
          data:this.data,
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      },
      options: {
        elements: {
          line: {
           borderWidth: 3
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Transmisión de '+spot.mediaRef+ ' del 01/01/2023 al '+hoy
          },
          datalabels: {    
            borderWidth: 2,
            borderRadius: 100,
            color: 'black',
            font: {
              weight: 'bold',
              lineHeight: 1, 
              size: 16
            },
            padding: {
              top: 5
            },
          },
        },
      }    
    });
  }

  async ngOnInit() {  
    await this.storage.create();
    
    this.video=await this.storage.get("video");
    
    var sourceTag = <HTMLVideoElement>document.getElementById('video')!;
      sourceTag.setAttribute('src', this.video.source);
      sourceTag.setAttribute('type', 'video/mp4');
      sourceTag.currentTime= this.video.start+0.5
  
    $("#ref").html('Referencia: <b>'+this.video.mediaRef+"</b>")
    $("#date").html('Fecha: <b>'+this.video.date+"</b>")
    $("#start").html('Inicio de detección: <b>'+this.video.dateStart+"</b>")
    $("#end").html('Fin de detección: <b>'+this.video.dateEnd+"</b>")
    $("#cer").html('Certeza: <b>'+Math.round((this.video.confidence)*100)+"%</b>")

    ////////////////////////// Chart ////////////////////////////////////////
    this.getinformation();
  }
}
