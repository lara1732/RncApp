import { Component, OnInit, Input } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone:true,
})
export class CalendarComponent implements OnInit {
@Input() slides:any[] = [];
swiperModules = [IonSlides];
  constructor() { }

  ngOnInit() {}

}
