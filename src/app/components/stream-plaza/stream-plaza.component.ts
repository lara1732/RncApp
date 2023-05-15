import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-stream-plaza',
  templateUrl: './stream-plaza.component.html',
  styleUrls: ['./stream-plaza.component.scss'],
})
export class StreamPlazaComponent implements OnChanges {

  @Input() data5: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
  
  isOpen5 = false;
  selected5: any[] = [];
  filtered5: any[] = [];

  constructor(private storage:Storage) { }

  ngOnChanges() {

    this.filtered5 = this.data5;
  }

  open5(){
    this.isOpen5 = true;
  }

  cancel5(){
    this.isOpen5 = false;
  }

  select5(){
    const selected = this.data5.filter((item) => item.selected);
    this.selected5 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen5 = false;
    this.storage.set("plaza",selected);
    

    if(selected.length == 0){
      $("#streamcanal").attr('disabled','true');

      
    }else{
      $("#streamcanal").removeAttr('disabled');
      
    }
   
    
  }

  itemSelected5(){
    this.selected5 = this.data5.filter((item) => item.selected);

    if(!this.multiple && this.selected5.length) {

      this.selectedChanged.emit(this.selected5)
      this.isOpen5 = false;
      //this.data.map((item) => (item.selected = false));
      
    }
  }

  filter5(event: SearchbarCustomEvent){
    const filter5 = event.detail.value?.toLowerCase();
    this.filtered5 = this.data5.filter(item => this.leaf(item).toLowerCase().indexOf(filter5) >=0);
  }
  
  leaf = (obj: any) => 
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);


    async ngOnInit() {
      await this.storage.create();  
    }

     Clean(){

      this.selected5 = [];
    }
  
}
