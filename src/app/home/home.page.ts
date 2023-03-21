import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  locations: any = [];  
  
  constructor(private http: HttpClient, private storage:Storage) {

    //this.loadLocations();

  }

  async loadLocations() {

    let Id = await this.storage.get('id');  

    this.http
      .get('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getPlazas.php?uss='+Id)
      .subscribe((res: any) => {
        this.locations = res;
        console.log(this.locations);
        
      });
  }

  selectChanged(event: any) { 

    console.log('CHANGED: ', event);


  }

   async ngOnInit() {

    await this.storage.create();
    this.loadLocations();

  }

}
