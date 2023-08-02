import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-transmisiones-canal',
  templateUrl: './transmisiones-canal.component.html',
  styleUrls: ['./transmisiones-canal.component.scss'],
})

export class TransmisionesCanalComponent implements OnInit{

  @Input() data7: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen7 = false;
  selected7: any[] = []; 
  filtered7: any[] = []; 
  selectAll: boolean = false;

  constructor(private storage:Storage) { }

  ngOnChanges(){
    this.filtered7 = this.data7;
  }
  
  open7(){
    this.isOpen7 = true;
    $("#canal7").attr('checked','true');
  }

  cancel7(){
    this.isOpen7 = false;
  }

  select7(){
    const selected = this.data7.filter((item) => item.selected);
    this.selected7 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen7 = false;
    this.storage.set("canal",selected);
    console.log(selected)

      if(selected.length == 0){
        $("#btnbuscarT").attr('disabled','true');
        
        
      }else{
        $("#btnbuscarT").removeAttr('disabled');
      
      } 
  }

  itemSelected7(){
    const allSelected = this.filtered7.every(item => item.selected);
    this.selectAll = allSelected;
  }

  filter7(event: SearchbarCustomEvent){
    const filter7 = event.detail.value?.toLowerCase();
    this.filtered7 = this.data7.filter(item => this.leaf(item).toLowerCase().indexOf(filter7) >=0);
  }

  leaf = (obj: any) => 
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);

  async ngOnInit() {
    await this.storage.create();  
  }
}
