import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {

    
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
  },
  {
    path: 'stream',
    loadChildren: () => import('./stream/stream.module').then( m => m.StreamPageModule)
  },
  {
    path: 'stream',
    loadChildren: () => import('./stream/stream.module').then( m => m.StreamPageModule)
  },
  {
    path: 'seleccion',
    loadChildren: () => import('./seleccion/seleccion.module').then( m => m.SeleccionPageModule)
  },
  {
    path: 'streams',
    loadChildren: () => import('./streams/streams.module').then( m => m.StreamsPageModule)
  },
  {
    path: 'transmisiones',
    loadChildren: () => import('./transmisiones/transmisiones.module').then( m => m.TransmisionesPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)

  },
  {
    path: 'video-t',
    loadChildren: () => import('./video-t/video-t.module').then( m => m.VideoTPageModule)
  },
  {
    path: 'calendar-tickets',
    loadChildren: () => import('./calendar-tickets/calendar-tickets.module').then( m => m.CalendarTicketsPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'addticket',
    loadChildren: () => import('./addticket/addticket.module').then( m => m.AddticketPageModule)
  },
 
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
