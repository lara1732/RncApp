import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser'
@Component({
  selector: 'app-videopopup',
  templateUrl: './videopopup.page.html',
  styleUrls: ['./videopopup.page.scss'],
})
export class VideopopupPage implements OnInit  {
//@Input()
//urlSafe: SafeResourceUrl;
  constructor(private modalController: ModalController, public sanitizer: DomSanitizer ) { }
  //passurl: string;
ngOnInit() {
  //this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.passurl);
  console.log('${this.urlSafe}');
}

}
