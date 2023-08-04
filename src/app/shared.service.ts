import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {


  selected2: any[] = [];
  selected3: any[] = [];
  selectedS: any[] = [];

  updateSelected2(value: any[]) {
    this.selected2 = value;
    this.selected3 = value;
    this.selectedS = value;
  }

  getVersion(): string {
    return '1.1.7'; // Cambia este valor según la versión actual
  }
}
