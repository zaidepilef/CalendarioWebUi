import { ChangeDetectorRef, Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import swal from 'sweetalert2';
import { FormComponentBase } from '../../utilidades/form-component-base';

@Component({
	selector: 'app-creardestinatario',
	templateUrl: './creardestinatario.component.html',
	styleUrls: ['./creardestinatario.component.css']
})

export class CreardestinatarioComponent extends FormComponentBase implements OnInit {

	//periodicidad: any[];
	cmbtareaprogramada: any[];

	@ViewChild(MatTable, { static: true }) table: MatTable<any>;
	@ViewChild(MatAutocompleteTrigger, { static: false })
	autoCompleteTrigger: MatAutocompleteTrigger;
	title = 'CustomAutocomplete';

	//cajas formulario
	botonAgregar: boolean;
	codActivo: number;
	usuarioCreacion: string;
	formulario: FormGroup;
	codUsuario: string;
	idTareaProgramada: number;
	//periodicidadSeleccionada: number;
	cmbtareaprogramadaSeleccionada: number;
	//usuario: string;
	usuarioSeleccionado: string;
	nombreCompletoSelected: string;
	codUsuarioSelected: string;
	//objeto al API
	dataEnvia: any = {}
	response: any = [{}]
	dropdownList = [];
	formGroupDestinatario: FormGroup;
	filteredUsuarios: Observable<string[]>;
	filteredUsuarios2: Set<string>;

	constructor(private fb: FormBuilder, private service: CalendarioService, private router: Router, private ref: ChangeDetectorRef) {
		super()
		/*   this.formulario = this.fb.group({
		codUsuario: new FormControl('')
	  }); */
		//this.periodicidad = [];
		this.cmbtareaprogramada = [];
		//this.CargaDataCombo();
		this.CargaDataComboTareas();
		this.CargaDataDestinatarios();
	}

	ngOnInit(): void {
		this.formGroupDestinatario = this.fb.group({
			idTareaProgramada: ['', [
				Validators.required,
				//Validators.minLength(6),
				//Validators.maxLength(50)
				//.pattern('^[a-zA-Z0-9]*$')
			]],
			/* 	codUsuario: ['', [
				Validators.required,
				//Validators.maxLength(100)
			  ]], */

			//myControlDestinatario: new FormControl('', [
			myControlDestinatario: ['', [
				Validators.required,
				//this.optionNotFound.bind(this),
			]],
			//]),

		});

		this.validationMessages = {
			idTareaProgramada: {
				required: 'Nombre Aplicativo es obligatorio.',
			},
			myControlDestinatario: {
				required: 'Nombre Aplicativo es obligatorio.',
			},

		};

		this.formErrors = {
			idTareaProgramada: '',
			myControlDestinatario: '',
		};


	}

	/* CargaDataCombo() {
  
	  this.service.listartipoperiodicidad().subscribe(
		res => {
		  this.response = res;
		  console.log('this.response : ', this.response);
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
  
	} */


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



	onSubmit_Destinatario() {

		this.dataEnvia = {
			idTareaProgramada: this.cmbtareaprogramadaSeleccionada,
			//codUsuario:this.usuario,
			codActivo: 1,
			usuarioCreacion: 'test',
		}

		console.log('this.dataEnvia : ', this.dataEnvia);


		//Buscar Nombre si Nombre de Tarea Programada, ya Existe

		//  if(!(this.nombre == null || this.nombre == undefined || this.nombre == "null" || this.nombre == "undefined")){
		/* this.service.InsertarTareaProgramada(this.dataEnvia).subscribe(
		res => {
		  console.log('res de insertar : ', res);
		  this.response = res;
		  if(this.response.message == "OK"){
			swal.fire({
			  title: 'Registro Guardado',
			   text: "",
			   icon: 'success',
			   showCancelButton: false,
			   confirmButtonColor: '#3085d6',
			   //cancelButtonColor: '#d33',
			   confirmButtonText: 'OK'
			 }).then((result) => {
			   if (result.isConfirmed) {
				this.router.navigateByUrl('/destinatarios');
			   }
			 })
	
		  }
	
		  if(this.response.message == "No OK"){
	
			swal.fire({
			  title: 'Registro No Guardado',
			   text: "Ocurrió un error inesperado",
			   icon: 'error',
			   showCancelButton: false,
			   confirmButtonColor: '#3085d6',
			   //cancelButtonColor: '#d33',
			   confirmButtonText: 'OK'
			 })
	
		  }
		  
		  
		  if(this.response.message == "No OK"){
	
			swal.fire({
			  title: 'Registro No Guardado',
			   text: "Ocurrió un error inesperado",
			   icon: 'error',
			   showCancelButton: false,
			   confirmButtonColor: '#3085d6',
			   //cancelButtonColor: '#d33',
			   confirmButtonText: 'OK'
			 })
	
		  }
	
	
		  if(this.response.message == "No OK"){
	
			swal.fire({
			  title: 'Registro No Guardado',
			   text: "Ocurrió un error inesperado",
			   icon: 'error',
			   showCancelButton: false,
			   confirmButtonColor: '#3085d6',
			   //cancelButtonColor: '#d33',
			   confirmButtonText: 'OK'
			 })
	
		  }
	
	
	    
		}
		, err => console.error(err)
	  ); */
		//  }

	}


	Volver() {
		this.router.navigateByUrl('/destinatarios');
	}

	getPosts(userId) {
		this.codUsuarioSelected = "";
		console.log('userId : ', userId);
		let userSelected = this.response.filter((resp) => resp.nombreCompleto == userId)[0]
		console.log('userSelected : ', userSelected)
		this.codUsuarioSelected = userSelected.codUsuario;
		this.nombreCompletoSelected = userSelected.nombreCompleto;

	}

	// Mat Autocomplete function
	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.dropdownList.filter(
			(option) => option.toLowerCase().indexOf(filterValue) === 0
		);
		/*
		return this.dropdownList.filter(
		  (option) => option.toLowerCase().indexOf(filterValue) === 0
		);
		*/
	}


	optionNotFound(control: AbstractControl): { [s: string]: boolean } {
		const value = control.value;
		this.filteredUsuarios2 = new Set(
			this.dropdownList.filter(
				(option) =>
					option.toLowerCase().indexOf(value.toLowerCase()) >= 0
			)
		);
		if (value && !this.filteredUsuarios2.size) {
			return { noOption: true };
		}
		return null;
	}

	CargaDataDestinatarios() {

		this.service.listarUsuarios().subscribe(
			res => {
				this.response = res;
				console.log('this.usuarios : ', this.response);

				this.response.forEach(obj => {
					console.log('objUsuarios : ', obj);
					this.dropdownList.push(obj.nombreCompleto)
				});
			}
			, err => console.error(err)
		);

	}

}