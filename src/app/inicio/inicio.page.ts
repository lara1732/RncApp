import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { async } from '@angular/core/testing';
import * as moment from 'moment';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  @ViewChild('Calendar') calendarComponent: FullCalendarComponent;

  link="";
  calendarVisible = true;
  calendarOptions: CalendarOptions = {

    
    

    locale:'es',
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    
    views: {
      dayGridMonth: { buttonText: 'Mes' },
      timeGridWeek: { buttonText: 'Semana' },
      listWeek: { buttonText: 'Lista' },
      title: {month: 'short'}
    },
    
    
    headerToolbar: {
      left: 'prev,next today',
      center: '',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      //meridiem: true,
      hour12: false,
      omitZeroMinute : false
    },
    slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
    },
    
    
    initialView: 'dayGridMonth',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    
    
    
    
    

    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  
  

  constructor(private changeDetector: ChangeDetectorRef, private storage:Storage, private router:Router){

    
    

  }
  
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  


  handleEventClick(clickInfo: EventClickArg) {

    
    
    var  adata = {id:clickInfo.event.id}
    
      $.ajax({
        url: ('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getVideo.php'),
        type:'POST',
        dataType: "Json",
        data: adata,
        crossDomain: true,
        async: true,
        success:(dataId) =>{ 
              
          this.storage.set('video',dataId);   
          this.router.navigate(['/video']);
          
        }
      })

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  

  





  async ngOnInit() {
    await this.storage.create();
    this.link = await this.storage.get('link');  
    console.log(this.link);
    this.calendarOptions.events=this.link
    let calendarApi = this.calendarComponent.getApi();
    var date = calendarApi.getDate();
    console.log(moment(date).format('YYYY-MM-DD'));

  }
  
  
  
}


