import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import { CustomValidators } from './custom.validators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crearcalendarizacion',
  templateUrl: './crearcalendarizacion.component.html',
  styleUrls: ['./crearcalendarizacion.component.css']
})
export class CrearcalendarizacionComponent implements OnInit {

  
  form!: FormGroup;
	/*errorMatcher = new CrossFieldErrorMatcher();
 */

cmbtareaprogramada: any[];
	//cajas formulario
	hora: boolean;
	fecha: boolean;
	botonAgregar: boolean;
	grillaFechas: boolean;
	intervalo: boolean;
	semana: boolean;
	meses: boolean;
	dias: boolean;
	idTareaProgramada: number;
	usuarioCreacion:string;
	periodicidad: any[];
	diasDelaSemana: any[];
	mesesDelAnnio: any[];
	diasDelMes: any[];

	diasDelaSemanaSeleccionado: Array<string> = [];
	countDiasdelaSemana: number = 0;

	mesesDelAnnioSeleccionado: Array<string> = [];
	countMesesDelAnnioSeleccionado: number = 0;

	diasDelMesSeleccionado: Array<string> = [];
	countDiasDelMesSeleccionado: number = 0;

	fechasEspecificas: Array<string> = [];
	countFechasEspecificas: number = 0;


	//form: FormGroup;
	nombreAplicativo: string;
	periodicidadSeleccionada: number;
	numeroIntervalo: number;
	horario: string;
	fechaAplicacion: Date;

	cmbtareaprogramadaSeleccionada: number;

	//objeto al API
	dataEnvia: any = {}

	response: any = [{}]
	fechaRepetida:boolean;
	busquedaConfiguracion:boolean;
	resultadoInsercion: string;
	dataGrillaFechas: any[];


	fg: FormGroup;
	businessUnits: any[] = [];


	/// nuevos formularios
	formulariodefault: boolean;

	formulariodiario: boolean;
	formGroupDiario: FormGroup;

	formulariosemanal: boolean;
	formGroupSemanal: FormGroup;

	formulariomensual: boolean;
	formGroupMensual: FormGroup;

	formulariointervalohora: boolean;
	formGroupIntervaloHora: FormGroup;

	formulariofechaespecifica: boolean;
	formGroupFechaEspecifica: FormGroup;


  //constructor(private fb: FormBuilder, private service: CalendarioService, private router: Router, private ref: ChangeDetectorRef) { 
    constructor(private fb: FormBuilder, private service: CalendarioService, private router: Router) { 
    //super();
  /*   this.validationMessages = {
			nombreAplicativo: {
				required: 'Nombre Aplicativo es obligatorio.',
			},
			diasDelaSemana: {
				required: 'Seleccione al menos un día de la Semana.',
			}
		}; */

	/* 	this.formErrors = {
			nombreAplicativo: '',
			diasDelaSemana: '',
		}; */

		this.periodicidad = [];
		this.cmbtareaprogramada = [];
		this.fechaAplicacion = new Date();
		this.usuarioCreacion = "Test";
		this.CargaDataCombo();
		this.CargaDataComboTareas();

  }

	onSubmitdiario() {
		console.log(this.formGroupDiario.value)

		this.dataEnvia = {
			//nombreAplicativo: this.formGroupDiario.value.nombreAplicativo,
			idTareaProgramada: this.cmbtareaprogramadaSeleccionada,
			codPeriodicidadProceso: this.periodicidadSeleccionada,
			meses: [],
			dias: [],
			hora: this.formGroupDiario.value.horario,
			intervalo: 0,
			usuarioCreacion: this.usuarioCreacion,
		}
		console.log('this.dataEnvia : ', this.dataEnvia);
		this.idTareaProgramada = 1;
		this.service.BuscarCalendarioTareaProgramdaByIdTarea(this.idTareaProgramada).subscribe(
		  res => {
			console.log('res de insertar : ', res);
			this.response = res;
			if(this.response.nombreTareaProgramada != ""){
			  swal.fire({
				title: 'Tarea Programada',
				 text: "Está Tarea Programada, ya tiene una configuración asignada",
				 icon: 'error',
				 showCancelButton: false,
				 confirmButtonColor: '#3085d6',
				 //cancelButtonColor: '#d33',
				 confirmButtonText: 'OK'
			   })/*. then((result) => {
				 if (result.isConfirmed) {
				  this.router.navigateByUrl('/calendarizacion');
				 }
			   }) */
	
			}else{
			  
			  this.service.InsertarCalendarizacion(this.dataEnvia).subscribe(
				res => {
				  console.log('res de insertar : ', res);
				   
				  this.response = res;
				  if(this.response.message == "OK"){
					swal.fire({
					  title: 'Calendarización Guardada',
					   text: "",
					   icon: 'success',
					   showCancelButton: false,
					   confirmButtonColor: '#3085d6',
					   //cancelButtonColor: '#d33',
					   confirmButtonText: 'OK'
					 }).then((result) => {
					   if (result.isConfirmed) {
						this.router.navigateByUrl('/calendarizacion');
					   }
					 })
		  
				  }else{
					swal.fire({
					  title: 'Registro No Guardado',
					   text: "Ocurrió un error inesperado",
					   icon: 'error',
					   showCancelButton: false,
					   confirmButtonColor: '#3085d6',
					   //cancelButtonColor: '#d33',
					   confirmButtonText: 'OK'
					 }).then((result) => {
					   if (result.isConfirmed) {
						this.router.navigateByUrl('/calendarizacion');
					   }
					 })
		  
				  }
				
				  
				}
				, err => console.error(err)
			  );
	
			}
		  
		  }
		  , err => console.error(err)
		);
	
	  }  



	 onSubmitSemanal() {

		//console.log('this.diasDelaSemanaSeleccionado : ', this.diasDelaSemanaSeleccionado)
		this.dataEnvia = {
			//nombreAplicativo: this.formGroupSemanal.value.nombreAplicativo,
			idTareaProgramada: this.cmbtareaprogramadaSeleccionada,
			codPeriodicidadProceso: this.periodicidadSeleccionada,
			semanas: this.diasDelaSemanaSeleccionado,
			meses: [],
			dias: [],
			hora: this.formGroupSemanal.value.horario,
			intervalo: 0,
			usuarioCreacion: this.usuarioCreacion,
		}
		console.log('this.dataEnvia : ', this.dataEnvia);
	    this.idTareaProgramada = 2;
    this.service.BuscarCalendarioTareaProgramdaByIdTarea(this.idTareaProgramada).subscribe(
      res => {
        console.log('res de insertar : ', res);
        this.response = res;
        if(this.response.nombreTareaProgramada != ""){
          swal.fire({
            title: 'Tarea Programada',
             text: "Está Tarea Programada, ya tiene una configuración asignada",
             icon: 'error',
             showCancelButton: false,
             confirmButtonColor: '#3085d6',
             //cancelButtonColor: '#d33',
             confirmButtonText: 'OK'
           })/*. then((result) => {
             if (result.isConfirmed) {
              this.router.navigateByUrl('/calendarizacion');
             }
           }) */

        }else{
          
          this.service.InsertarCalendarizacion(this.dataEnvia).subscribe(
            res => {
              console.log('res de insertar : ', res);
               
              this.response = res;
              if(this.response.message == "OK"){
                swal.fire({
                  title: 'Calendarización Guardada',
                   text: "",
                   icon: 'success',
                   showCancelButton: false,
                   confirmButtonColor: '#3085d6',
                   //cancelButtonColor: '#d33',
                   confirmButtonText: 'OK'
                 }).then((result) => {
                   if (result.isConfirmed) {
                    this.router.navigateByUrl('/calendarizacion');
                   }
                 })
      
              }else{
                
                swal.fire({
                  title: 'Registro No Guardado',
                   text: "Ocurrió un error inesperado",
                   icon: 'error',
                   showCancelButton: false,
                   confirmButtonColor: '#3085d6',
                   //cancelButtonColor: '#d33',
                   confirmButtonText: 'OK'
                 }).then((result) => {
                   if (result.isConfirmed) {
                    this.router.navigateByUrl('/calendarizacion');
                   }
                 })
      
              }
            
              
            }
            , err => console.error(err)
          );

        }
      
      }
      , err => console.error(err)
    );

    

  }



  onSubmitMensual() {
		console.log(this.formGroupMensual.value)
		this.dataEnvia = {
			//nombreAplicativo: this.formGroupMensual.value.nombreAplicativo,
			idTareaProgramada: this.cmbtareaprogramadaSeleccionada,
			codPeriodicidadProceso: this.periodicidadSeleccionada,
			semanas: [],
			meses: this.mesesDelAnnioSeleccionado,
			dias: this.diasDelMesSeleccionado,
			hora: this.formGroupMensual.value.horario,
			intervalo: 0,
			usuarioCreacion: this.usuarioCreacion,
		}

	  
		this.idTareaProgramada = 3;
		this.service.BuscarCalendarioTareaProgramdaByIdTarea(this.idTareaProgramada).subscribe(
		   res => {
			 console.log('res de búsqueda : ', res);
			 this.response = res;
			 if(this.response.nombreTareaProgramada != ""){
			   this.busquedaConfiguracion = true;
			   swal.fire({
				 title: 'Tarea Programada',
				  text: "Está Tarea Programada, ya tiene una configuración asignada",
				  icon: 'error',
				  showCancelButton: false,
				  confirmButtonColor: '#3085d6',
				  //cancelButtonColor: '#d33',
				  confirmButtonText: 'OK'
				})
	 
			 }else{
			   this.service.InsertarCalendarizacion(this.dataEnvia).subscribe(
				 res => {
				   console.log('res de insertar : ', res);           
				   this.response = res;
				   this.resultadoInsercion = this.response.message;
				   console.log('res para mensaje : ', this.response.message);                    
				   
				   if(this.resultadoInsercion == "OK"){
					 swal.fire({
					   title: 'Calendarización Guardada',
						text: "",
						icon: 'success',
						showCancelButton: false,
						confirmButtonColor: '#3085d6',
						//cancelButtonColor: '#d33',
						confirmButtonText: 'OK'
					  }).then((result) => {
						if (result.isConfirmed) {
						 this.router.navigateByUrl('/calendarizacion');
						}
					  })
					
				   }
				   if(this.resultadoInsercion == "No OK"){
		 
					 swal.fire({
					   title: 'Calendarización',
						text: "Está Calendarización, no pudo ser guardada",
						icon: 'error',
						showCancelButton: false,
						confirmButtonColor: '#3085d6',
						//cancelButtonColor: '#d33',
						confirmButtonText: 'OK'
					  })
				   }

				   if(this.resultadoInsercion == "Fecha Repetida"){
		 
					swal.fire({
					  title: 'Calendarización',
					   text: "Está Calendarización, tiene fechas del último día del mes repetidas",
					   icon: 'error',
					   showCancelButton: false,
					   confirmButtonColor: '#3085d6',
					   //cancelButtonColor: '#d33',
					   confirmButtonText: 'OK'
					 })
				  } 
				   
				   if(this.resultadoInsercion == "Fecha no OK"){
		 
					 swal.fire({
					   title: 'Calendarizacion',
						text: "Está calendarización, tiene fechas no válidas",
						icon: 'error',
						showCancelButton: false,
						confirmButtonColor: '#3085d6',
						//cancelButtonColor: '#d33',
						confirmButtonText: 'OK'
					  })
				   }                          
				 
				 }
				 
				 , err => console.error(err)
			   );
			 }
	 
		   }
		   , err => console.error(err)
		 ); 
		  
	   }
	

 	onSubmitIntervaloHora() {

		console.log(this.formGroupIntervaloHora.value)

		this.dataEnvia = {
			//nombreAplicativo: this.formGroupIntervaloHora.value.nombreAplicativo,
			idTareaProgramada: this.cmbtareaprogramadaSeleccionada,
			codPeriodicidadProceso: this.periodicidadSeleccionada,
			semanas: [],
			meses: [],
			dias: [],
			hora: "",
			intervalo: this.formGroupIntervaloHora.value.intervalo,
			usuarioCreacion: this.usuarioCreacion,
		}
		
		this.idTareaProgramada = 4;
		this.service.BuscarCalendarioTareaProgramdaByIdTarea(this.idTareaProgramada).subscribe(
		  res => {
			console.log('res de insertar : ', res);
			this.response = res;
			if(this.response.nombreTareaProgramada != ""){
			  swal.fire({
				title: 'Tarea Programada',
				 text: "Está Tarea Programada, ya tiene una configuración asignada",
				 icon: 'error',
				 showCancelButton: false,
				 confirmButtonColor: '#3085d6',
				 //cancelButtonColor: '#d33',
				 confirmButtonText: 'OK'
			   })/*. then((result) => {
				 if (result.isConfirmed) {
				  this.router.navigateByUrl('/calendarizacion');
				 }
			   }) */
	
			}else{
			  
			  this.service.InsertarCalendarizacion(this.dataEnvia).subscribe(
				res => {
				  console.log('res de insertar : ', res);
				   
				  this.response = res;
				  if(this.response.message == "OK"){
					swal.fire({
					  title: 'Calendarización Guardada',
					   text: "",
					   icon: 'success',
					   showCancelButton: false,
					   confirmButtonColor: '#3085d6',
					   //cancelButtonColor: '#d33',
					   confirmButtonText: 'OK'
					 }).then((result) => {
					   if (result.isConfirmed) {
						this.router.navigateByUrl('/calendarizacion');
					   }
					 })
		  
				  }else{
					swal.fire({
					  title: 'Registro No Guardado',
					   text: "Ocurrió un error inesperado",
					   icon: 'error',
					   showCancelButton: false,
					   confirmButtonColor: '#3085d6',
					   //cancelButtonColor: '#d33',
					   confirmButtonText: 'OK'
					 }).then((result) => {
					   if (result.isConfirmed) {
						this.router.navigateByUrl('/calendarizacion');
					   }
					 })
		  
				  }
				
				  
				}
				, err => console.error(err)
			  );
	
			}
		  
		  }
		  , err => console.error(err)
		);
	
	
	  }


 	onSubmitFechaEspecifica() {

		console.log(this.formGroupFechaEspecifica.value)

	
			for (let value of Object.values(this.dataGrillaFechas)) {
				//console.log('EnviarFechaEspecifica : ', value)
				this.fechasEspecificas.push(value.fecha.toString());
			}

			console.log('this.nombreAplicativo : ', this.nombreAplicativo);

			this.dataEnvia = {
				//nombreAplicativo: this.formGroupFechaEspecifica.value.nombreAplicativo,
				idTareaProgramada: this.cmbtareaprogramadaSeleccionada,
				codPeriodicidadProceso: this.periodicidadSeleccionada,
				semanas: this.diasDelaSemanaSeleccionado,
				meses: [],
				dias: [],
				hora: this.horario,
				intervalo: 0,
				fechasEspecificas: this.fechasEspecificas,
				usuarioCreacion: this.usuarioCreacion,
			}

			console.log('this.dataEnvia : ', this.dataEnvia);
			// se conecta al servicio
			this.idTareaProgramada = 5;
			this.service.BuscarCalendarioTareaProgramdaByIdTarea(this.idTareaProgramada).subscribe(
			  res => {
				console.log('res de insertar : ', res);
				this.response = res;
				if(this.response.nombreTareaProgramada != ""){
				  swal.fire({
					title: 'Tarea Programada',
					 text: "Está Tarea Programada, ya tiene una configuración asignada",
					 icon: 'error',
					 showCancelButton: false,
					 confirmButtonColor: '#3085d6',
					 //cancelButtonColor: '#d33',
					 confirmButtonText: 'OK'
				   })/*. then((result) => {
					 if (result.isConfirmed) {
					  this.router.navigateByUrl('/calendarizacion');
					 }
				   }) */
		
				}else{
				  
				  this.service.InsertarCalendarizacion(this.dataEnvia).subscribe(
					res => {
					  console.log('res de insertar : ', res);
					   
					  this.response = res;
					  if(this.response.message == "OK"){
						swal.fire({
						  title: 'Calendarización Guardada',
						   text: "",
						   icon: 'success',
						   showCancelButton: false,
						   confirmButtonColor: '#3085d6',
						   //cancelButtonColor: '#d33',
						   confirmButtonText: 'OK'
						 }).then((result) => {
						   if (result.isConfirmed) {
							this.router.navigateByUrl('/calendarizacion');
						   }
						 })
			  
					  }else{
						swal.fire({
						  title: 'Registro No Guardado',
						   text: "Ocurrió un error inesperado",
						   icon: 'error',
						   showCancelButton: false,
						   confirmButtonColor: '#3085d6',
						   //cancelButtonColor: '#d33',
						   confirmButtonText: 'OK'
						 }).then((result) => {
						   if (result.isConfirmed) {
							this.router.navigateByUrl('/calendarizacion');
						   }
						 })
			  
					  }
					
					  
					}
					, err => console.error(err)
				  );
		
				}
			  
			  }
			  , err => console.error(err)
			);
		  
		  }



	checkValue(event: any) {
		console.log(event);
	}


  ngOnInit(): void {

		this.formulariodefault = true;

		this.diasDelaSemana = [
			{
				id: 1,
				dia: "Lunes",
				checked: false
			},
			{
				id: 2,
				dia: "Martes",
				checked: false
			},
			{
				id: 3,
				dia: "Miercoles",
				checked: false
			},
			{
				id: 4,
				dia: "Jueves",
				checked: false
			},
			{
				id: 5,
				dia: "Viernes",
				checked: false
			},
			{
				id: 6,
				dia: "Sabado",
				checked: false
			},
			{
				id: 7,
				dia: "Domingo",
				checked: false
			}
		];


		this.mesesDelAnnio = [
			{
				id: 1,
				mes: "Enero",
				checked: false
			},
			{
				id: 2,
				mes: "Febrero",
				checked: false
			},
			{
				id: 3,
				mes: "Marzo",
				checked: false
			},
			{
				id: 4,
				mes: "Abril",
				checked: false
			},
			{
				id: 5,
				mes: "Mayo",
				checked: false
			},
			{
				id: 6,
				mes: "Junio",
				checked: false
			},
			{
				id: 7,
				mes: "Julio",
				checked: false
			},
			{
				id: 8,
				mes: "Agosto",
				checked: false
			},
			{
				id: 9,
				mes: "Septiembre",
				checked: false
			},
			{
				id: 10,
				mes: "Octubre",
				checked: false
			},
			{
				id: 11,
				mes: "Noviembre",
				checked: false
			},
			{
				id: 12,
				mes: "Diciembre",
				checked: false
			}
		];


		this.diasDelMes = [
			{
				dia: "1",
				id: 1,
				checked: false
			},
			{
				dia: "2",
				id: 2,
				checked: false
			},
			{
				dia: "3",
				id: 3,
				checked: false
			},
			{
				dia: "4",
				id: 4,
				checked: false
			},
			{
				dia: "5",
				id: 5,
				checked: false
			},
			{
				dia: "6",
				id: 6,
				checked: false
			},
			{
				dia: "7",
				id: 7,
				checked: false
			},
			{
				dia: "8",
				id: 8,
				checked: false
			},
			{
				dia: "9",
				id: 9,
				checked: false
			},
			{
				dia: "10",
				id: 10,
				checked: false
			},
			{
				dia: "11",
				id: 11,
				checked: false
			}, {
				dia: "12",
				id: 12,
				checked: false
			},
			{
				dia: "13",
				id: 13,
				checked: false
			},
			{
				dia: "14",
				id: 14,
				checked: false
			},
			{
				dia: "15",
				id: 15,
				checked: false
			},
			{
				dia: "16",
				id: 16,
				checked: false
			},
			{
				dia: "17",
				id: 17,
				checked: false
			},
			{
				dia: "18",
				id: 18,
				checked: false
			},
			{
				dia: "19",
				id: 19,
				checked: false
			},
			{
				dia: "20",
				id: 20,
				checked: false
			},
			{
				dia: "21",
				id: 21,
				checked: false
			},
			{
				dia: "22",
				id: 22,
				checked: false
			},
			{
				dia: "23",
				id: 23,
				checked: false
			},
			{
				dia: "24",
				id: 24,
				checked: false
			},
			{
				dia: "25",
				id: 25,
				checked: false
			},
			{
				dia: "26",
				id: 26,
				checked: false
			},
			{
				dia: "27",
				id: 27,
				checked: false
			},
			{
				dia: "28",
				id: 28,
				checked: false
			},
			{
				dia: "29",
				id: 29,
				checked: false
			},
			{
				dia: "30",
				id: 30,
				checked: false
			},
			{
				dia: "31",
				id: 31,
				checked: false
			},
			{
				dia: "Ultimo Dia",
				id: 32,
				checked: false
			}
		];

		this.dataGrillaFechas = [];


		this.businessUnits = [
			{ name: 'BU 1', value: "1" },
			{ name: 'BU 2', value: "2" },
			{ name: 'BU 3', value: "3" }
		];


		this.fg = this.fb.group({
			firstName: ['', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(15),
				Validators.pattern('^[a-zA-Z0-9]*$')
			]],
			bUnits: this.fb.array(
				this.businessUnits.map(() => this.fb.control('')),
				CustomValidators.multipleCheckboxRequireOne
			)
		});


		this.formGroupDiario = this.fb.group({
		/* 	nombreAplicativo: ['', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(15),
				Validators.pattern('^[a-zA-Z0-9]*$')
			]], */			
			tareaProgramada: ['', [
					Validators.required,					
				]]	,
			horario: ['', [
				Validators.required
			]],
			periodicidad: ['', [
				Validators.required
			]]
		});


		this.formGroupSemanal = this.fb.group({

			periodicidad: ['', [
				Validators.required
			]],
			/* nombreAplicativo: ['', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(15),
				Validators.pattern('^[a-zA-Z0-9]*$')
			]], */
			tareaProgramada: ['', [
				Validators.required,					
			]]	,
			horario: ['', [
				Validators.required
			]],
			diasSemana: this.fb.array(
				this.diasDelaSemana.map(() => this.fb.control('')),
				CustomValidators.multipleCheckboxRequireOne
			)
		});


 		this.formGroupMensual = this.fb.group({

			periodicidad: ['', [
				Validators.required
			]],
		/* 	nombreAplicativo: ['', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(15),
				Validators.pattern('^[a-zA-Z0-9]*$')
			]], */
			tareaProgramada: ['', [
				Validators.required,					
			]]	,
			horario: ['', [
				Validators.required
			]]
		});
 

		this.formGroupIntervaloHora = this.fb.group({

			periodicidad: ['', [
				Validators.required
			]],
			/* nombreAplicativo: ['', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(15),
				Validators.pattern('^[a-zA-Z0-9]*$')
			]], */
			tareaProgramada: ['', [
				Validators.required,					
			]]	,
			intervalo: ['', [
				Validators.required
			]],

		});


	 	this.formGroupFechaEspecifica = this.fb.group({

			periodicidad: ['', [
				Validators.required
			]],
			/* nombreAplicativo: ['', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(15),
				Validators.pattern('^[a-zA-Z0-9]*$')
			]], */
			tareaProgramada: ['', [
				Validators.required,					
			]]	,
			horario: ['', [
				Validators.required
			]],
 

		});


	}


  convertToValue(key: string) {
		return this.form.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
	}


	// periodicidad change combo box
	comboPeriodicidadChange() {

		if (this.periodicidadSeleccionada === 1) {

			this.formulariodefault = false;
			this.formulariodiario = true;
			this.formulariosemanal = false;
			this.formulariomensual = false;
			this.formulariointervalohora = false;
			this.formulariofechaespecifica = false;

		} else if (this.periodicidadSeleccionada === 2) {
			this.formulariodefault = false;
			this.formulariodiario = false;
			this.formulariosemanal = true;//
			this.formulariomensual = false;
			this.formulariointervalohora = false;
			this.formulariofechaespecifica = false;

		} else if (this.periodicidadSeleccionada === 3) {
			this.formulariodefault = false;
			this.formulariodiario = false;
			this.formulariosemanal = false;
			this.formulariomensual = true;
			this.formulariointervalohora = false;
			this.formulariofechaespecifica = false;

		} else if (this.periodicidadSeleccionada === 4) {
			this.formulariodefault = false;
			this.formulariodiario = false;
			this.formulariosemanal = false;
			this.formulariomensual = false;
			this.formulariointervalohora = true;
			this.formulariofechaespecifica = false;

		} else if (this.periodicidadSeleccionada === 5) {
			this.formulariodefault = false;
			this.formulariodiario = false;
			this.formulariosemanal = false;
			this.formulariomensual = false;
			this.formulariointervalohora = false;
			this.formulariofechaespecifica = true;

		} else {

			this.formulariodefault = true;
			this.formulariodiario = false;
			this.formulariosemanal = false;
			this.formulariomensual = false;
			this.formulariointervalohora = false;
			this.formulariofechaespecifica = false;

		}

	}


	// dias de la semana
	semanachangeList(e) {
		this.diasDelaSemanaSeleccionado = [];

		for (let value of Object.values(this.diasDelaSemana)) {
			if (value.checked) {
				this.diasDelaSemanaSeleccionado.push(value.id.toString());
			}
		}
		this.countDiasdelaSemana = this.diasDelaSemanaSeleccionado.length

	}

	// meses del año
	meseschangeList() {
		this.mesesDelAnnioSeleccionado = [];

		for (let value of Object.values(this.mesesDelAnnio)) {
			if (value.checked) {
				this.mesesDelAnnioSeleccionado.push(value.id.toString());
			}
		}
		this.countMesesDelAnnioSeleccionado = this.mesesDelAnnioSeleccionado.length
	}

	// dias del mes
	diaschangeList() {
		this.diasDelMesSeleccionado = [];

		for (let value of Object.values(this.diasDelMes)) {
			if (value.checked) {
				this.diasDelMesSeleccionado.push(value.id.toString());
			}
		}
		this.countDiasDelMesSeleccionado = this.diasDelMesSeleccionado.length
	}



	submitForm() {
		const valueToStore = Object.assign({}, this.form.value, {
			mesesDelAnnio: this.convertToValue('mesesDelAnnio'),
			diasDelMes: this.convertToValue('diasDelMes'),
			diasDelaSemana: this.convertToValue('diasDelaSemana')
		});
		console.log(valueToStore);
	}





	PeriodicidadChange() {
		console.log('this.periodicidadSeleccionada : ', this.periodicidadSeleccionada);
		if (this.periodicidadSeleccionada === 1) {

			this.hora = true;
			this.grillaFechas = false;
			this.botonAgregar = false;
			this.fecha = false;
			this.intervalo = false;
			this.semana = false;
			this.meses = false;
			this.dias = false;

		} else if (this.periodicidadSeleccionada === 2) {

			this.hora = true;
			this.grillaFechas = false;
			this.botonAgregar = false;
			this.fecha = false;
			this.intervalo = false;
			this.semana = true;
			this.meses = false;
			this.dias = false;

		} else if (this.periodicidadSeleccionada === 3) {

			this.hora = true;
			this.grillaFechas = false;
			this.botonAgregar = false;
			this.fecha = false;
			this.intervalo = false;
			this.semana = false;
			this.meses = true;
			this.dias = true;

		} else if (this.periodicidadSeleccionada === 4) {

			this.hora = false;
			this.grillaFechas = false;
			this.botonAgregar = false;
			this.fecha = false;
			this.intervalo = true;
			this.semana = false;
			this.meses = false;
			this.dias = false;

		} else if (this.periodicidadSeleccionada === 5) {

			this.hora = true;
			this.grillaFechas = true;
			this.botonAgregar = true;
			this.fecha = true;
			this.intervalo = false;
			this.semana = false;
			this.meses = false;
			this.dias = false;

		} else {

			this.hora = false;
			this.grillaFechas = false;
			this.botonAgregar = false;
			this.fecha = false;
			this.intervalo = false;
			this.semana = false;
			this.meses = false;
			this.dias = false;

		}
	}




/* 	Guardar() {

		console.log('this.diasDelaSemanaSeleccionado : ', this.diasDelaSemanaSeleccionado);
		console.log('this.mesesDelAnnioSeleccionado : ', this.mesesDelAnnioSeleccionado);
		console.log('this.diasDelMesSeleccionado : ', this.diasDelMesSeleccionado);

		if (this.periodicidadSeleccionada === 1) {
			this.EnviarDiario()
    } 
    else if (this.periodicidadSeleccionada === 2) {
			this.EnviarSemanal()
		} else if (this.periodicidadSeleccionada === 3) {
			this.EnviarMensual()
		} else if (this.periodicidadSeleccionada === 4) {
			this.EnviarIntervalo()
		} else if (this.periodicidadSeleccionada === 1002) {
			this.EnviarFechaEspecifica()
		} else {

		}
 
	}

	EnviarDiario() {
		this.dataEnvia = {
			nombreAplicativo: this.nombreAplicativo,
			codPeriodicidadProceso: this.periodicidadSeleccionada,
			semana: this.diasDelaSemanaSeleccionado,
			meses: [],
			dias: [],
			hora: this.horario,
			intervalo: 0,
		}

		if (this.nombreAplicativo == "" || this.nombreAplicativo == undefined) {

		} else if (this.horario == "" || this.horario == undefined) {


		}


		console.log('this.dataEnvia : ', this.dataEnvia);
		this.service.InsertarCalendarizacion(this.dataEnvia).subscribe(
			res => {
				console.log('res de insertar : ', res);
			}
			, err => console.error(err)
		);
	} */

	Volver() {
		this.router.navigateByUrl('/tareas');
	}


  CargaDataCombo() {

		this.service.listartipoperiodicidad().subscribe(
			res => {
				this.response = res;
				//console.log('this.response : ', this.response);
				this.response.forEach(obj => {
					console.log('obj : ', obj);
					this.periodicidad.push({
						id: obj.idTipoPeriodicidad,
						periodo: obj.descTipoPeriodicidad
					});
				});
			}
			, err => console.error(err)
		);

	}


	CargaDataComboTareas() {

		this.service.ListarTareasProgramadas().subscribe(
		  res => {
			this.response = res;
			console.log('this.response : ', this.response);
			this.response.forEach(obj => {
			  console.log('obj : ', obj);
			  this.cmbtareaprogramada.push({
				idTareaProgramada: obj.idTareaProgramada,
				nombre: obj.nombre
			  });
			});
		  }
		  , err => console.error(err)
		);
	
	  }
	



	FechaCambia(dateObject) {
		console.log("DATE", dateObject);
		const stringified = JSON.stringify(dateObject.value);
		const dob = stringified.substring(1, 11);
		console.log("dob : ", dob);

	}


	AgregarFechas() {

		let countGrilla = this.dataGrillaFechas.length;
		console.log('this.dataGrillaFechas : ', this.dataGrillaFechas);

		const stringified = JSON.stringify(this.fechaAplicacion);
		const dob = stringified.substring(1, 11);

		const temp = this.dataGrillaFechas.slice();
		temp.push({
			id: countGrilla++,
			fecha: dob
		});
		this.dataGrillaFechas = temp;

	}

	eliminarRowGrilla(element) {
		console.log('element : ', element)

		const index = this.dataGrillaFechas.indexOf(element);
		console.log('index : ', index)
		this.dataGrillaFechas.splice(index, 1);
		const temp = this.dataGrillaFechas.slice();
		this.dataGrillaFechas = temp;

	}



}