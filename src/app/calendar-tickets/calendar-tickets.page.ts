import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { CalendarOptions, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-calendar-tickets',
  templateUrl: './calendar-tickets.page.html',
  styleUrls: ['./calendar-tickets.page.scss'],
})
export class CalendarTicketsPage implements OnInit {

  constructor(private changeDetector: ChangeDetectorRef, 
    private storage:Storage, 
    private router:Router, 
    private loadingCtrl: LoadingController)
  {}

  tickets: any = [];
  metadataMapping:any = {}
  @ViewChild('CalendarTickets') calendarComponent: FullCalendarComponent;
  link="";
  calendarVisible = true;
  currentEvents: EventApi[] = [];
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

    const evento = clickInfo.event;
    const start: any  = evento.start;
    const day = start.getDate().toString().padStart(2, '0');
    const month = (start.getMonth() + 1).toString().padStart(2, '0');
    const year = start.getFullYear();

    // const end: any  = evento.end;
    // // const dayE = end.getDate().toString().padStart(2, '0');
    // const monthE = (end.getMonth() + 1).toString().padStart(2, '0');
    // const yearE = end.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    // const formattedDateEnd = `${dayE}/${monthE}/${yearE}`;
    
    if (evento.extendedProps && evento.extendedProps['evidence']){
       this.storage.set('pdf',evento.extendedProps['evidence'])
      
    }

    this.storage.set('title', evento.title)
    this.storage.set('start', formattedDate)
    // this.storage.set('end', formattedDateEnd)
    this.storage.set('contract', evento.extendedProps['contract'])
    this.storage.set('description', evento.extendedProps['description'])
    this.storage.set('priority', evento.extendedProps['priority'])
    this.storage.set('type', evento.extendedProps['type'])
    this.storage.set('status', evento.extendedProps['status'])


    // console.log(formattedDateEnd)

    this.router.navigate(['/tickets']);
          
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  handleDateChanged() {
    let calendarApi = this.calendarComponent.getApi();
    var date = calendarApi.getDate();
    moment.locale('es');
    
    let mes = (moment(date).format('MMMM')). charAt(0).toUpperCase() + (moment(date).format('MMMM')).slice(1) ;
    let title = mes + ' del ' + moment(date).format('YYYY');
    $("#title").html(title);
  }

  async getTickets(){

    let Id = await this.storage.get('id');
    let acceso = await this.storage.get('a');
    let privilegio;

    privilegio = acceso[0].Contratos    

    var adata = {p:privilegio, uss:Id}
      
    $.ajax({
      url: ('https://backup.tregional.mx/AbetCloud/models/queries/app/C_getTickets.php'),
      type:'POST',
      dataType: "Json",
      data: adata,
      crossDomain: true,
      async: true,
      success:(dataId) =>{        
        console.log(dataId)
        this.tickets =  dataId
        this.calendarOptions.events = this.tickets
                
      }
    });
  }

  async ngOnInit() {
    
    await this.storage.create();
    await this.getTickets();
    
    let calendarApi = this.calendarComponent.getApi();
    var date = calendarApi.getDate();
    moment.locale('es');
    
    let mes = (moment(date).format('MMMM')). charAt(0).toUpperCase() + (moment(date).format('MMMM')).slice(1) ;
    let title = mes + ' del ' + moment(date).format('YYYY');
    $("#title").html(title);
  }  
}

