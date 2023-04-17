import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideolabService } from '../videolab.service';
import { VideopopupPage } from '../videopopup/videopopup.page';
import {Router} from '@angular/router';
import { __values } from 'tslib';
@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  //videoList = "https://backup.tregional.mx/AbetCloud/";
  constructor(private modalController: ModalController, private videolabService: VideolabService, private router: Router) { }
    items: any [""];


  config ={
spaceBetween: 0,
centeredSlides: true,
slidesPerView: 1.4,
loop: true,
autoplay: true,
fullscreen: true
};

/* goVideo(){
  this.router.navigate(['/video'])
 }*/
async videomodal(){ 
const modal = this.modalController.create({
component: VideopopupPage,
cssClass: 'my-modal-css',
componentProps: {
 
}
});

return(await modal).present();

}


ngOnInit() {
 this.items = this.videolabService.getvideos();
 console.log(this.items);
}
 
}
