import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
//import { EventEmitter } from 'stream';
import * as $ from "jquery";

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-searchable-spot',
  templateUrl: './searchable-spot.component.html',
  styleUrls: ['./searchable-spot.component.scss'],
})
export class SearchableSpotComponent implements OnChanges {

  @Input() data3: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen3 = false;
  selected3: any[] = [];
  filtered3: any[] = [];


  constructor(private storage:Storage) { }

  ngOnChanges() {

    this.filtered3 = this.data3;
  }

  open3(){
    this.isOpen3 = true;
  }

  cancel3(){
    this.isOpen3 = false;
  }

  select3(){
    const selected = this.data3.filter((item) => item.selected);
    this.selected3 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen3 = false;
    this.storage.set("spot",selected)

    if(selected.length == 0){
      $("#btnbuscar").attr('disabled','true');
      
    }else{
      $("#btnbuscar").removeAttr('disabled');
      
    }
    
    
  }

  itemSelected3(){
    this.selected3 = this.data3.filter((item) => item.selected);

    if(!this.multiple && this.selected3.length) {

      this.selectedChanged.emit(this.selected3)
      this.isOpen3 = false;
      //this.data.map((item) => (item.selected = false));
      
    }
  }

  filter3(event: SearchbarCustomEvent){

    const filter3 = event.detail.value?.toLowerCase();  
    this.filtered3 = this.data3.filter(item => this.leaf(item).toLowerCase().indexOf(filter3) >=0);
  }
  
  leaf = (obj: any) => 
    
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);



    async ngOnInit() {
      await this.storage.create();  
    }
  
}
