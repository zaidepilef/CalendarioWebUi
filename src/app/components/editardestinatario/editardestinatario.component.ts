import { ChangeDetectorRef, Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service'
import Swal from 'sweetalert2'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import swal from 'sweetalert2'
import { FormComponentBase } from '../../utilidades/form-component-base'


@Component({
	selector: 'app-editardestinatario',
	templateUrl: './editardestinatario.component.html',
	styleUrls: ['./editardestinatario.component.css']
})
export class EditardestinatarioComponent extends FormComponentBase implements OnInit {
	//periodicidad: any[];
	cmbtareaprogramada: any[];

	@ViewChild(MatTable, { static: true }) table: MatTable<any>;
	@ViewChild(MatAutocompleteTrigger, { static: false })
	autoCompleteTrigger: MatAutocompleteTrigger;
	title = 'CustomAutocomplete';
	idDestinatario: number;
	//cajas formulario
	botonAgregar: boolean;
	codActivo: number;
	usuarioCreacion: string;
	formulario: FormGroup;
	codUsuario: string;
	idTareaProgramada: number;
	//periodicidadSeleccionada: number;
	cmbtareaprogramadaSeleccionada: number;
	myControlDestinatario: number;
	//usuario: string;
	usuarioSeleccionado: string;
	nombreCompletoSelected: string;
	nombreCompletoSelectedSolo: string;
	codUsuarioSelected: string;

	//objeto al API
	dataEnvia: any = {}
	response: any = [{}]
	dropdownList = [];
	filteredUsuarios: Observable<string[]>;
	filteredUsuarios2: Set<string>;

	formGroupDestinatario: FormGroup;

	constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private service: CalendarioService, private router: Router, private ref: ChangeDetectorRef) {
		super()

		this.cmbtareaprogramada = [];

		this.formGroupDestinatario = new FormGroup({
			myControl2: new FormControl('', [
				Validators.required,
				this.optionNotFound.bind(this),
			]),
		});

		this.CargaDataDestinatarios();
		this.CargaDataComboTareas();

	}

	ngOnInit(): void {

		let params: any = this.activatedRoute.snapshot.params;
		this.idDestinatario = Number(params.id)

		this.formGroupDestinatario = this.fb.group({
			idTareaProgramada: ['', [
				Validators.required,
				//Validators.minLength(6),
				//Validators.maxLength(50)
				//.pattern('^[a-zA-Z0-9]*$')
			]],
			/*  codUsuario: ['', [
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


		this.BuscarDestinatario(params.id);


		this.filteredUsuarios = this.formGroupDestinatario.controls.myControlDestinatario.valueChanges.pipe(
			startWith(''),
			map((value) =>
				this._filter(value)
			)
		);

	}

	CargaDataComboTareas() {

		this.service.ListarTareasProgramadas().subscribe(
			res => {
				this.response = res;
				this.response.forEach(obj => {
					this.cmbtareaprogramada.push({
						idTareaProgramada: obj.idTareaProgramada,
						nombre: obj.nombre
					});
				});
			}
			, err => console.error(err)
		);

	}


	BuscarDestinatario(id: any) {

		this.service.BuscarDestinatarioById(id).subscribe(
			res => {
				this.response = res;
				this.cmbtareaprogramadaSeleccionada = this.response.idTareaProgramada;
				//this.formGroupTareaProgramada.value.nombre = this.response.codigoUsuario;
				this.codUsuarioSelected = this.response.codUsuario;
				this.codUsuario = this.response.codUsuario;
				this.nombreCompletoSelectedSolo = this.response.nombreUsuario;
				this.nombreCompletoSelected = this.response.nombreUsuario;
				console.log('response : ', this.response);


			}
			, err => console.error(err)
		);
	}


	onSubmit_Destinatario() {

		//formGroupDestinatario
		console.log('formGroupDestinatario : ', this.formGroupDestinatario);

		var _nombresillo = this.formGroupDestinatario.value.myControlDestinatario.toString().replace("  ", " ").replace("   ", " ").replace("   ", " ").replace("   ", " ");

		console.log('_nombresillo : ', _nombresillo.trim());
		console.log('dropdownList : ', this.dropdownList);

		var selecteCode = this.dropdownList.filter((x) => x.nombreCompleto == _nombresillo.trim())
		console.log('selecteCode : ', selecteCode[0]);
		var code = '';
		if (selecteCode) {
			code = selecteCode[0];
		} else {
			code = '0'
		}


		this.dataEnvia = {
			idTareaProgramada: this.cmbtareaprogramadaSeleccionada,
			codUsuario: code || '',
			codActivo: 1,
			nombreUsuario: this.nombreCompletoSelectedSolo,
			nombreUsuarioSeleccionado: this.nombreCompletoSelected,
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
		console.log('UserId : ', userId)
		let userSelected = this.dropdownList.filter((resp) => resp.nombreCompleto == userId.nombreCompleto)[0]

		this.codUsuarioSelected = userSelected.codUsuario;
		this.nombreCompletoSelected = userSelected.nombreCompleto;
		this.nombreCompletoSelectedSolo = userSelected.nombreCompleto;
		this.codUsuario = userSelected.codUsuario;

	}

	// Mat Autocomplete function
	private _filter(value: string): string[] {
		console.log('Value : ', value)
		return this.dropdownList.filter(
			(option) => option.nombreCompleto.toLowerCase().indexOf(value) === 0
		);
		/*
		return this.dropdownList.filter(
		  (option) => option.toLowerCase().indexOf(filterValue) === 0
		);
		*/
	}


	optionNotFound(control: AbstractControl): { [s: string]: boolean } {
		const value = control.value;
		console.log('control.value : ', control.value)
		console.log('value : ', value)

		this.filteredUsuarios2 = new Set(
			this.dropdownList.filter(
				(option) => option.nombreCompleto.toLowerCase().indexOf(value) >= 0
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
					this.dropdownList.push(obj)
				});
			}
			, err => console.error(err)
		);

	}


}