import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser'
@Component({
  selector: 'app-videopopup',
  templateUrl: './videopopup.page.html',
  styleUrls: ['./videopopup.page.scss'],
  
})
export class VideopopupPage implements OnInit  {
oniput(){


  
}
urlSafe: any[] = [];
SafeResourceUrl:any[]=[];
  constructor(private modalController: ModalController, public sanitizer: DomSanitizer ) { }
  passurl: any = [""];
ngOnInit() {
  //this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.passurl);
  console.log('${this.urlSafe}');
}

}
