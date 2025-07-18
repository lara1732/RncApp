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

  SelectedItem: any; // Variable para almacenar el elemento seleccionado

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
    this.storage.set("Cstream",selected);
    console.log(selected)

    if(selected.length == 0){
      $("#btnbuscarStream").attr('disabled','true');
      
    }else{
      $("#btnbuscarStream").removeAttr('disabled');
      
    }
    
  }

  itemSelected6(item:any){

    this.selectedChanged.emit(this.selected6)
    
    if( item.selected = true){

      this.select6();
      
      this.filtered6.forEach((item) => {
        item.selected = false;
      });
  
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

    
}
