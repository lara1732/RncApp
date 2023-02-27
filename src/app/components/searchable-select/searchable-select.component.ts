import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnInit {

  isOpen = false;
  selected = [];
  constructor() { }

  ngOnInit() {}

  open(){
    this.isOpen = true;
  }

  cancel(){
    this.isOpen = false;
  }

  select(){
    this.isOpen = true;
  }

}
