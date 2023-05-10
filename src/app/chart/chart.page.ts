import { AfterViewInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';




@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements AfterViewInit {
  
  @ViewChild('radar') private barCanvas: ElementRef;

  radarChart: any;
  
  data: any = []
  constructor(private http: HttpClient, private storage:Storage) {  }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {

    this.getinformation();
    // 
    
  }

  getinformation(){

    // let spot = await this.storage.get('spot');
    // let plazas = await this.storage.get('plaza')

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getRadar.php?mf=83791&p=Guadalajara')
      .subscribe((res: any) => {
        this.data = JSON.stringify(res);
        this.data = this.data.slice(2, -2);     
        this.data = this.data.split(","); 
        // this.data = res;  
        console.log(this.data);

        this.radarChartMethod();
      });

      
  }

  radarChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    Chart.register(ChartDataLabels);
    console.log('hola')
    this.radarChart = new Chart(this.barCanvas.nativeElement, {

      type: 'radar',
      data: {
      labels: [
        'LasEstrellasXHGA',
        'XEWO',
        'CanalCincoXHGUE',
        'XHG'
      ],
      datasets: [{
        label: 'Prueba',
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
            display: false,
            text: 'Transmisión de <?php echo $MediaRef; ?> del 01/01/2023 al 04/05/2023'
        },
        datalabels: {
         
          formatter: (value, ctx) => { 
           
            console.log(value);
            return value;


          },
          borderWidth: 2,
          borderRadius: 100,
          color: 'black',
          font: {
            weight: 'bold',
            lineHeight: 1, 
            size: 16
          },
          // formatter: Math.round,
          //padding: 6
          padding: {
            top: 5
          },
        },
      },
      // maintainAspectRatio: false,
    }    
  }); 
}

// async ngOnInit() {

//   await this.storage.create();
 

// }
}
