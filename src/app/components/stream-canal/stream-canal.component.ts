import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-stream-canal',
  templateUrl: './stream-canal.component.html',
  styleUrls: ['./stream-canal.component.scss'],
})

export class StreamCanalComponent implements OnInit {

  @Input() data6: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
  
  isOpen6 = false;
  selected6: any[] = [];
  filtered6: any[] = [];

  constructor(private storage:Storage) { }

  ngOnChanges() {

    this.filtered6 = this.data6;
  }

  open6(){
    this.isOpen6 = true;
  }

  cancel6(){
    this.isOpen6 = false;
  }

  select6(){
    const selected = this.data6.filter((item) => item.selected);
    this.selected6 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen6 = false;
    this.storage.set("plaza",selected);
    

    if(selected.length == 0){
      $("#streamcanal").attr('disabled','true');

      
    }else{
      $("#streamcanal").removeAttr('disabled');
      $("#btnbuscarStream").removeAttr('disabled');
    }
   
    
  }

  itemSelected6(){
    this.selected6 = this.data6.filter((item) => item.selected);

    if(!this.multiple && this.selected6.length) {

      this.selectedChanged.emit(this.selected6)
      this.isOpen6 = false;
      //this.data.map((item) => (item.selected = false));
      
    }
  }

  filter6(event: SearchbarCustomEvent){
    const filter6 = event.detail.value?.toLowerCase();
    this.filtered6 = this.data6.filter(item => this.leaf(item).toLowerCase().indexOf(filter6) >=0);
  }
  
  leaf = (obj: any) => 
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);


    async ngOnInit() {
      await this.storage.create();  
    }

     Clean(){

      this.selected6 = [];
    }
}
