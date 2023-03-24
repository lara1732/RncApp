import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideolabService {
private videoData = [
  {url:'https://www.youtube.com/embed/BEhd2S5GbUg', images:'/assets/playV.jpg'},
  //{url:'https://www.youtube.com/embed/BEhd2S5GbUg', images:'/assets/fondo.jpg'}
];
  constructor() { }

    getvideos(){
     return this.videoData; 
    }


}
//<iframe width="560" height="315" src="https://www.youtube.com/embed/BEhd2S5GbUg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>