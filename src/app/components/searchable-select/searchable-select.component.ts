import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";
import { SharedService } from "../../shared.service"

//import { EventEmitter } from 'stream';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnChanges {

  @Input() data: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen = false;
  selected: any[] = [];
  filtered: any[] = [];

  selectAll: boolean = false;


  constructor(private storage:Storage, public sharedService: SharedService) { }

  ngOnChanges() {

    this.filtered = this.data;
  }

  open(){
    this.isOpen = true;
  }

  cancel(){
    this.isOpen = false;
  }

  select(){
    const selected = this.data.filter((item) => item.selected);
    this.sharedService.selected2 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen = false;
    this.storage.set("plaza",selected);
    

    if(selected.length == 0){
      $("#canal").attr('disabled','true');
      $("#spot").attr('disabled','true');
      
    }else{
      $("#canal").removeAttr('disabled');
      
    }
   
    
  }
  toggleSelectAll() {
    this.filtered.forEach(item => {
      item.selected = this.selectAll;
    });
    this.itemSelected();
  }

  itemSelected(){
    const allSelected = this.filtered.every(item => item.selected);
    this.selectAll = allSelected;
  }

  filter(event: SearchbarCustomEvent){
    const filter = event.detail.value?.toLowerCase();
    this.filtered = this.data.filter(item => this.leaf(item).toLowerCase().indexOf(filter) >=0);
  }
  
  leaf = (obj: any) => 
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);


    async ngOnInit() {
      await this.storage.create();  
    }

     Clean(){

      this.selected = [];
    }
  
}
