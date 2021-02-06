import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
	selector: 'app-autocompletar',
	templateUrl: './autocompletar.component.html',
	styleUrls: ['./autocompletar.component.css']
})

export class AutocompletarComponent implements OnInit {

	@ViewChild(MatAutocompleteTrigger, { static: false })
	autoCompleteTrigger: MatAutocompleteTrigger;
	title = 'CustomAutocomplete';

	dropdownList = [];

    usuarioSeleccionado: string;
	nombreCompletoSelected: string;
	codUsuarioSelected: string;
	response: any = [{}]
	myFormGroup1: FormGroup;
	myFormGroup2: FormGroup;
	filteredOptions1: Observable<string[]>;
	filteredOptions2: Set<string>;


	constructor(private service: CalendarioService) {
		this.myFormGroup1 = new FormGroup({
			myControl1: new FormControl(),
		});
		this.myFormGroup2 = new FormGroup({
			myControl2: new FormControl('', [
				Validators.required,
				this.optionNotFound.bind(this),
			]),
		});

		this.CargaDataCombo();
		//this.usuarioSeleccionado ="[QA]ALBERTO ACHUI   SOTO";
		//this.codUsuarioSelected = "AACHUI";
		//this.nombreCompletoSelected = "[QA]ALBERTO ACHUI   SOTO";
		//this.getPosts("[QA]ALBERTO ACHUI   SOTO");
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
		this.filteredOptions1 = this.myFormGroup1.controls.myControl1.valueChanges.pipe(
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


	// My Custom function
	optionNotFound(control: AbstractControl): { [s: string]: boolean } {
		const value = control.value;
		this.filteredOptions2 = new Set(
			this.dropdownList.filter(
				(option) =>
					option.toLowerCase().indexOf(value.toLowerCase()) >= 0
			)
		);
		if (value && !this.filteredOptions2.size) {
			return { noOption: true };
		}
		return null;
	}


}
