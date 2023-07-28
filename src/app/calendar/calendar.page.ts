import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

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
      
    },

    buttonText: {
      today: 'Hoy'
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
    
    
    
    
    
    datesSet: this.handleDateChanged.bind(this),
    
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  
  

  constructor(private changeDetector: ChangeDetectorRef, private storage:Storage, private router:Router, private loadingCtrl: LoadingController){

    
    

  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
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
    console.log(adata)
      $.ajax({
        url: ('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getVideoTransmisiones.php'),
        type:'POST',
        dataType: "Json",
        data: adata,
        crossDomain: true,
        async: true,
        success:(dataId) =>{ 
          console.log(dataId)
          this.storage.set('video-t',dataId);   
          this.router.navigate(['/video-t']);
          
        }
      })

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }


  handleDateChanged() {
    let calendarApi = this.calendarComponent.getApi();
    var date = calendarApi.getDate();
    moment.locale('es');
    //console.log(moment(date).format('YYYY-MM-DD'));
    let mes = (moment(date).format('MMMM')). charAt(0).toUpperCase() + (moment(date).format('MMMM')).slice(1) ;
    let title = mes + ' del ' + moment(date).format('YYYY');
    $("#title").html(title);
}

  async ngOnInit() {
    
    await this.storage.create();
    this.link = await this.storage.get('link');  
    this.calendarOptions.events=this.link
    let calendarApi = this.calendarComponent.getApi();
    var date = calendarApi.getDate();
    moment.locale('es');
    //console.log(moment(date).format('YYYY-MM-DD'));
    let mes = (moment(date).format('MMMM')). charAt(0).toUpperCase() + (moment(date).format('MMMM')).slice(1) ;
    let title = mes + ' del ' + moment(date).format('YYYY');
    $("#title").html(title);


  }

  
}



