import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { CalendarizacionComponent } from './components/calendarizacion/calendarizacion.component';
//import { EditarTareaComponent } from './components/editar-tarea/editar-tarea.component';
import { TareaprogramadaComponent } from './components/tareaprogramada/tareaprogramada.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
//import { AplicativoComponent } from './components/aplicativo/aplicativo.component';
//import { EditaraplicativoComponent } from './components/editaraplicativo/editaraplicativo.component';
//import { NuevoaplicativoComponent } from './components/nuevoaplicativo/nuevoaplicativo.component';
//import {TestvalComponent} from './components/testval/testval.component';
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

const routes: Routes = [

	{ path: '', redirectTo: '/calendarizacion', pathMatch: 'full' },
	{
		path: 'calendarizacion',
		pathMatch: 'full',
		component: CalendarizacionComponent
	},


	{
		path: 'destinatarios',
		pathMatch: 'full',
		component: DestinatarioComponent
	},

	{
		path: 'creardestinatario',
		pathMatch: 'full',
		component: CreardestinatarioComponent
	},


	{
		path: 'crearcalendarizacion',
		pathMatch: 'full',
		component: CrearcalendarizacionComponent
	},

	{
		path: 'tareas',
		pathMatch: 'full',
		component: TareaprogramadaComponent
	},

	{
		path: 'creartareaprogramada',
		pathMatch: 'full',
		component: CreartareaprogramadaComponent
	},

	{
		path: 'editartareaprogramada/:id',
		pathMatch: 'full',
		component: EditartareaprogramadaComponent
	},

	{
		path: 'editarcalendarizacion/:id',
		pathMatch: 'full',
		component: EditarcalendarizacionComponent
	},


	{
		path: 'editardestinatario/:id',
		pathMatch: 'full',
		component: EditardestinatarioComponent
	},

	{
		path: 'autocompletar2',
		pathMatch: 'full',
		component: Autocompletar2Component
	},

	{
		path: 'autocompletar',
		pathMatch: 'full',
		component: AutocompletarComponent
	},


	/*   
	 
    
	 */

	// {
	//   path: 'editarTarea/:id',
	//   component: EditarTareaComponent
	// },
	/*  
    
	  
	   */


	// {
	//   path: 'editaraplicativo/:id',
	//   component: EditaraplicativoComponent
	// },
	// {
	//   path: 'aplicativos',
	//   pathMatch: 'full',
	//   component: AplicativoComponent
	// },



	// {
	//   path: 'test',
	//   pathMatch: 'full',
	//   component: TestvalComponent
	// },

	/*   {
		 path: 'test2',
		 pathMatch: 'full',
		 component: Testval2Component
	  }, */

	/* {
	   path: 'test3/:id',
	   pathMatch: 'full',
	   component: Testval3Component
	},
  
	{
	  path: 'test4',
	  pathMatch: 'full',
	  component: Testval4Component
   }, */

	{
		path: '404',
		component: NotFoundComponent
	},
	{
		path: '**',
		redirectTo: '404'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }