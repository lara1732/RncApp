import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery"

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-transmisiones-plaza',
  templateUrl: './transmisiones-plaza.component.html',
  styleUrls: ['./transmisiones-plaza.component.scss'],
})

export class TransmisionesPlazaComponent implements OnInit {

  @Input() data8: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen8 = false;
  selected8: any[] = [];
  filtered8: any[] = [];
  selectAll: boolean = false;

  constructor(private storage:Storage) { }

  ngOnChanges() {
    this.filtered8 = this.data8;
  }

  open8(){
    this.isOpen8 = true;    
  }

  cancel8(){
    this.isOpen8 = false;
  }

  select8(){
    const selected = this.data8.filter((item) => item.selected);
    this.selected8 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen8 = false;
    this.storage.set("plaza",selected);
    console.log(selected);

      if(selected.length == 0){
        $("#canalT").attr('disabled','true');
        $("#btnbuscarT").attr('disabled','true');
        
      }else{
        $("#canalT").removeAttr('disabled');      
      }   
  }

  toggleSelectAll() {
    this.filtered8.forEach(item => {
      item.selected = this.selectAll;
    });
    this.itemSelected8();
  }

  itemSelected8(){
    const allSelected = this.filtered8.every(item => item.selected);
    this.selectAll = allSelected;
  }

  filter8(event: SearchbarCustomEvent){
    const filter = event.detail.value?.toLowerCase();
    this.filtered8 = this.data8.filter(item => this.leaf(item).toLowerCase().indexOf(filter) >=0);
  }

  leaf = (obj: any) => 
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);

  async ngOnInit() {
    await this.storage.create();  
  }
}
