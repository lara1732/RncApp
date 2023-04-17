import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";

//import { EventEmitter } from 'stream';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-searchable-canal',
  templateUrl: './searchable-canal.component.html',
  styleUrls: ['./searchable-canal.component.scss'],
})

export class SearchableCanalComponent implements OnChanges {

  @Input() data2: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen2 = false;
  selected2: any[] = []; 
  filtered2: any[] = []; 
 
  constructor(private storage:Storage) { }

  ngOnChanges() {
    this.filtered2 = this.data2;
  }

  open2(){
    this.isOpen2 = true;
    $("#canal1").attr('checked','true');

  }
  
  cancel2(){
    this.isOpen2 = false;
  }
  
  select2(){
    const selected = this.data2.filter((item) => item.selected);
    this.selected2 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen2 = false;
    this.storage.set("canal",selected);
    //console.log(selected)

    if(selected.length == 0){
      $("#spot").attr('disabled','true');
      
    }else{
      $("#spot").removeAttr('disabled');
      
    }
    
    
  }

  itemSelected2(){
    this.selected2 = this.data2.filter((item) => item.selected);

    if(!this.multiple && this.selected2.length){
      this.selectedChanged.emit(this.selected2);
      this.isOpen2 = false;
      
    }

  }

  filter2(event: SearchbarCustomEvent){
    const filter2 = event.detail.value?.toLowerCase();
    this.filtered2 = this.data2.filter(item => this.leaf(item).toLowerCase().indexOf(filter2) >=0);
    
  }

  leaf = (obj: any) => 
  this.itemTextField.split('.').reduce((value, el) => value[el], obj);

  async ngOnInit() {
    await this.storage.create();  
  }

}
