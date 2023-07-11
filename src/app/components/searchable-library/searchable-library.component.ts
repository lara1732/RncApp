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
  selector: 'app-searchable-library',
  templateUrl: './searchable-library.component.html',
  styleUrls: ['./searchable-library.component.scss'],
})

export class SearchableLibraryComponent implements OnInit {

  @Input() data4: any[] = [];
  @Input() multiple4 = false;
  @Input() itemTextField = '';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter();

  isOpen4 = false;
  selected4: any[] = [];
  filtered4: any[] = [];

  selectedItem: any; // Variable para almacenar el elemento seleccionado



  constructor(private storage:Storage) { }

  ngOnChanges() {

    this.filtered4 = this.data4;
  }

  open4(){
    this.isOpen4 = true;
  }

  cancel4(){
    this.isOpen4 = false;
  }

  select4(){

    const selected = this.data4.filter((item) => item.selected);
    this.selected4 = selected;
    this.selectedChanged.emit(selected);
    this.isOpen4 = false;
    this.storage.set("library",selected);
    // console.log(selected)
    

    if(selected.length == 0){
      $("#canal").attr('disabled','true');
      $("#spot").attr('disabled','true');
      $("#plaza").attr('disabled','true');
      
      
    }else{
      $("#plaza").removeAttr('disabled');
      $("#placeholderP").val("");
    }    
  }

  itemSelected4(item: any){    

    
    this.selectedChanged.emit(this.selected4)

   if( item.selected = true){

    this.select4();
    this.filtered4.forEach((item) => {
      item.selected = false;
    });

   }
    
    
  
    // Almacenar el elemento seleccionado
    this.selectedItem = item;
    
    

      //  if(!this.multiple && this.selected4.length) {

    
      //   this.select4();
                   
      //  }
  }

  filter4(event: SearchbarCustomEvent){
    const filter = event.detail.value?.toLowerCase();
    this.filtered4 = this.data4.filter(item => this.leaf(item).toLowerCase().indexOf(filter) >=0);
  }
  
  leaf = (obj: any) => 
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);


    async ngOnInit() {
      await this.storage.create();
        
    }
  

}
