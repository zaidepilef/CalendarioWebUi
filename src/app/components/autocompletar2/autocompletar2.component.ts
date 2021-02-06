import { Component, OnInit, ViewChild,NgModule } from '@angular/core';
import {
	FormControl,
	Validators,
	AbstractControl,
	FormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { CalendarioService } from 'src/app/services/calendario.service';
import { FormComponentBase } from '../../utilidades/form-component-base';


@Component({
  selector: 'app-autocompletar2',
  templateUrl: './autocompletar2.component.html',
  styleUrls: ['./autocompletar2.component.css']
})
export class Autocompletar2Component extends FormComponentBase implements OnInit {
  @ViewChild(MatAutocompleteTrigger, { static: false })
	autoCompleteTrigger: MatAutocompleteTrigger;
	title = 'CustomAutocomplete';

  dropdownList = [];

  dataEnvia: any = {}
  cmbtareaprogramada: any[];
  formulariodestinatario: boolean;
  usuarioSeleccionado: string;
  nombreCompletoSelected: string;
   codUsuarioSelected: string;
   response: any = [{}]
   frmDestinatario: FormGroup;   
   filteredUsuarios: Observable<string[]>;
   filteredUsuarios2: Set<string>;
   cmbtareaprogramadaSeleccionada: number;

  constructor(private service: CalendarioService) {
	super();	
	this.frmDestinatario = new FormGroup({
			//myControlDestinatario: new FormControl(),
			tareaProgramada: new FormControl('', [
				Validators.required,					
			]),
			myControlDestinatario: new FormControl('', [
				Validators.required,
			//this.optionNotFound.bind(this),
			
		]),

		
		});

		this.validationMessages = {
			myControlDestinatario: {
				required: 'Nombre Aplicativo es obligatorio.',
			},
			tareaProgramada: {
				required: 'Nombre Aplicativo es obligatorio.',
			},
			
		};

		this.formErrors = {
			myControlDestinatario: '',
			tareaProgramada: '',
		};

		/* this.myFormGroup2 = new FormGroup({
			myControl2: new FormControl('', [
				Validators.required,
				this.optionNotFound.bind(this),
			]),
		}); */
        this.cmbtareaprogramada = [];
		this.CargaDataCombo();
		this.CargaDataComboTareas();
		//this.usuarioSeleccionado ="[QA]ALBERTO ACHUI   SOTO";
		//this.codUsuarioSelected = "AACHUI";
		//this.nombreCompletoSelected = "[QA]ALBERTO ACHUI   SOTO";
		
	}


  getPosts(userId) {
		this.codUsuarioSelected = "";
		console.log('userId : ', userId);
		let userSelected = this.response.filter((resp) => resp.nombreCompleto == userId)[0]
		console.log('userSelected : ', userSelected)
		this.codUsuarioSelected = userSelected.codUsuario;
		this.nombreCompletoSelected = userSelected.nombreCompleto;

	}

	enviar(){
		console.log('codUsuarioSelected : ',this.codUsuarioSelected)
		console.log('nombreCompletoSelected : ',this.nombreCompletoSelected)
		console.log('valor Model : ',this.usuarioSeleccionado)

		if(this.nombreCompletoSelected != this.usuarioSeleccionado)
		{
			console.log('Resultado: ', 'Son Distintos')
		}

	}
 
  ngOnInit() {
		// Mat Autocomplete function
		this.filteredUsuarios = this.frmDestinatario.controls.myControlDestinatario.valueChanges.pipe(
			startWith(''),
			map((value) => this._filter(value))
		);
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




	CargaDataCombo() {

		this.service.listarUsuarios().subscribe(
			res => {
				this.response = res;
				console.log('this.response : ', this.response);

				this.response.forEach(obj => {
					console.log('obj : ', obj);
					this.dropdownList.push(obj.nombreCompleto)
				});
			}
			, err => console.error(err)
		);

	}

	onSubmitdestinatario() {
		
		console.log('codUsuarioSelected : ',this.codUsuarioSelected)
		console.log('nombreCompletoSelected : ',this.nombreCompletoSelected)
		console.log('valor Model : ',this.usuarioSeleccionado)
		console.log('Tarea Programada : ',this.cmbtareaprogramadaSeleccionada)


		/* this.dataEnvia = {
			nombreAplicativo: this.formGroupDiario.value.nombreAplicativo,
			codPeriodicidadProceso: this.periodicidadSeleccionada,
			meses: [],
			dias: [],
			hora: this.frmDestinatario.value.horario,
			intervalo: 0,
		} */
/* 		console.log('this.dataEnvia : ', this.dataEnvia);
		this.service.insertartareasprogramadas(this.dataEnvia).subscribe(
			res => {
				console.log('res de insertar : ', res);
				swal.fire('Exito', 'Datos ingresados', 'success');
			}
			, err => console.error(err)
		); */
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


}