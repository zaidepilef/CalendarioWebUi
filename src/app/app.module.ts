import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';
//import { CalendarizacionComponent } from './components/calendarizacion/calendarizacion.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MaterialModule } from './material.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { TareaprogramadaComponent } from './components/tareaprogramada/tareaprogramada.component';
import { MatTableExporterModule } from 'mat-table-exporter';
//import { AplicativoComponent } from './components/aplicativo/aplicativo.component';
//import { NuevoaplicativoComponent } from './components/nuevoaplicativo/nuevoaplicativo.component';
//import { EditaraplicativoComponent } from './components/editaraplicativo/editaraplicativo.component';
//import { TestvalComponent } from './components/testval/testval.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { CreartareaprogramadaComponent } from './components/creartareaprogramada/creartareaprogramada.component';
import { CreardestinatarioComponent } from './components/creardestinatario/creardestinatario.component';
import { CrearcalendarizacionComponent } from './components/crearcalendarizacion/crearcalendarizacion.component';
import { EditartareaprogramadaComponent } from './components/editartareaprogramada/editartareaprogramada.component';
import { EditarcalendarizacionComponent } from './components/editarcalendarizacion/editarcalendarizacion.component';
import { EditardestinatarioComponent } from './components/editardestinatario/editardestinatario.component';
//import { Testval2Component } from './components/testval2/testval2.component';
//import { Testval3Component } from './components/testval3/testval3.component';
//import { Testval4Component } from './components/testval4/testval4.component';
import { CalendarizacionComponent } from './components/calendarizacion/calendarizacion.component';
import { Autocompletar2Component } from './components/autocompletar2/autocompletar2.component';
import { AutocompletarComponent } from './components/autocompletar/autocompletar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    CalendarizacionComponent,
    DestinatarioComponent,
    CreardestinatarioComponent,
    CrearcalendarizacionComponent,
    EditarcalendarizacionComponent,
    EditardestinatarioComponent,
    TareaprogramadaComponent, 
    CreartareaprogramadaComponent,
    EditartareaprogramadaComponent,
    Autocompletar2Component,
    AutocompletarComponent
    //AplicativoComponent,
    //EditaraplicativoComponent,
    //TestvalComponent
    //,
    //,
    //
    //,Testval2Component
    //,Testval3Component,Testval4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatTableExporterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
