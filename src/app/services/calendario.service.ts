import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})

export class CalendarioService {

	constructor(private httpClient: HttpClient) { }

	// Tareas Programadas
	public ListarTareasProgramadas() {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/listartareasprogramadas/`);
	}

	public InsertarTareaProgramada(data: any) {
		return this.httpClient.post(`${environment.API_URL}/calendariotareasprogramadas/InsertarTareaProgramada`, data);
	}

	public EliminarTareaProgramada(id: any) {
		return this.httpClient.delete(`${environment.API_URL}/calendariotareasprogramadas/EliminarTareaProgramada/` + id);
	}

	public BuscarTareaProgramadaByNombre(nombreTareaProgramada: any) {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/BuscarTareaProgramadaByNombre/` + nombreTareaProgramada);
	}

	public BuscarTareaProgramadaByIdTarea(id: any) {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/BuscarTareaProgramadaByIdTarea/` + id);
	}

	public EditarTareaProgramada(data: any) {
		return this.httpClient.post(`${environment.API_URL}/calendariotareasprogramadas/EditarTareaProgramada`, data);
	}

	// Fin Tareas Programadas
	//Calendario Tareas Programadas
	public InsertarCalendarizacion(data: any) {
		return this.httpClient.post(`${environment.API_URL}/calendariotareasprogramadas/InsertarCalendarizacion/`, data);
	}

	public EditarCalendarizacion(data: any) {
		return this.httpClient.post(`${environment.API_URL}/calendariotareasprogramadas/EditarCalendarizacion/`, data);
	}


	// buscar calendario tarea programada by Id
	public BuscarCalendarioTareaProgramdaByIdTarea(id: any) {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/BuscarCalendarioTareaProgramdaByIdTarea/` + id);
	}

	// buscar calendario tarea programada by Id
	public BuscarCalendarioTareaProgramdaByNombre(nombreTareaProgramada: any) {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/BuscarTareaProgramdaByNombre/` + nombreTareaProgramada);
	}

	public EliminarCalendarizacion(id: any) {
		return this.httpClient.delete(`${environment.API_URL}/calendariotareasprogramadas/EliminarCalendarizacion/` + id);
	}

	public listartarcalendarizacion() {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/listarcalendarizacion/`);
	}

	public listartipoperiodicidad() {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/listartipoperiodicidad/`);
	}
	// Fin Calendario Tareas Programadas
	// Utilidades
	//public ValidadorFechas(data: any) {
	//return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/ValidadorFechas/` + data);
	//	return this.httpClient.post(`${environment.API_URL}/calendariotareasprogramadas/ValidadorFechas/`, data);
	//}
	// Fin Utilidades
	//Listar Calendarización

	/* 	public listaraplicativos() {
			return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/ListarAplicativos/`);
		}
	
		public BuscarAplicativoById(id: any) {
			return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/BuscarAplicativoById/` + id);
		}
	 */


	// para ediatr una Aplicativo
	/* 	public editaraplicativo(data: any) {
			return this.httpClient.post(`${environment.API_URL}/calendariotareasprogramadas/EditarAplicativo`, data);
		} */

	// para eliminar Aplicativo
	/* 	public eliminaraplicativo(id: any) {
			return this.httpClient.delete(`${environment.API_URL}/calendariotareasprogramadas/EliminarAplicativo/` + id);
		} */


	//Destinatarios

	// lista los Destinatarios
	public listardestinatarios() {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/listardestinatarios/`);
	}
	
	public listarUsuarios() {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/listarusuarios/`);
	}

	// para ingresar un Destinatario	
	public insertardestinatario(data: any) {
		return this.httpClient.post(`${environment.API_URL}/calendariotareasprogramadas/guardardestinatario`, data);
	}

	// para ingresar un Destinatario	
	public editardestinatario(data: any) {
		return this.httpClient.post(`${environment.API_URL}/calendariotareasprogramadas/editardestinatario`, data);
	}


	// para eliminar un destinatario
	public eliminardestinatario(id: any) {
		return this.httpClient.delete(`${environment.API_URL}/calendariotareasprogramadas/eliminardestinatario/` + id);
	}

	// buscar por get destinatario
	public BuscarDestinatarioById(id: any) {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/BuscarDestinatarioById/` + id);
	}


	// buscar por get codigo de usuario
	public BuscarCodigoUsuarioByNombre(id: any) {
		return this.httpClient.get(`${environment.API_URL}/calendariotareasprogramadas/BuscarCodigoUsuarioByNombre/` + id);
	}

	//Fin Destinatarios

}