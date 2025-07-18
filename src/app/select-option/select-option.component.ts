import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent implements OnInit {
  @Input() data6: any[] = [];
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();
  @Input() multiple = false;

  
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
    //this.selected6 = selected;
    //this.selectedChanged.emit(selected);
    this.isOpen6 = false;
    this.storage.set("Cstream",selected);
   // console.log(selected)

 
   
    
  }

  itemSelected6(){
    this.selected6 = this.data6.filter((item) => item.selected);

    if(!this.multiple && this.selected6.length) {
      const selected = this.data6.filter((item) => item.selected);
     this.selected6 = selected;
     this.selectedChanged.emit(selected);
      this.isOpen6 = false;
      this.storage.set("Cstream",selected);
      this.selectedChanged.emit(this.selected6)
      this.select6();

    //  this.isOpen6 = false;
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
}
