import { ChangeDetectorRef, Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from 'sweetalert2';

@Component({
	selector: 'app-editardestinatario',
	templateUrl: './editardestinatario.component.html',
	styleUrls: ['./editardestinatario.component.css']
})
export class EditardestinatarioComponent implements OnInit {

	cmbtareaprogramada: any[];

	@ViewChild(MatTable, { static: true }) table: MatTable<any>;
	//cajas formulario
	botonAgregar: boolean;
	codActivo: number;
	usuarioCreacion: string;
	formulario: FormGroup;
	codUsuario: string;

	idDestinatario: number;
	//periodicidadSeleccionada: number;
	cmbtareaprogramadaSeleccionada: number;
	usuario: string;

	//objeto al API
	dataEnvia: any = {}
	response: any = [{}]
	formGroupDestinatario: FormGroup;

	constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private service: CalendarioService, private router: Router) {

		/*  this.form = this.fb.group({
		   nombre: new FormControl('',[Validators.required]),
		   url: new FormControl('',[Validators.required])
		 }); */
		this.cmbtareaprogramada = [];
		//this.CargaDataCombo();
		this.CargaDataComboTareas();



	}

	ngOnInit(): void {

		let params: any = this.activatedRoute.snapshot.params;
		this.idDestinatario = Number(params.id)
		console.log('id : ', params.id);

		this.formGroupDestinatario = this.fb.group({
			idTareaProgramada: ['', [
				Validators.required,
				//Validators.minLength(6),
				//Validators.maxLength(50)
				//.pattern('^[a-zA-Z0-9]*$')
			]],
			codUsuario: ['', [
				Validators.required,
				//Validators.maxLength(100)
			]],
		});

		this.BuscarDestinatario(params.id);

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


	BuscarDestinatario(id: any) {

		this.service.BuscarDestinatarioById(id).subscribe(
			res => {
				this.response = res;
				this.cmbtareaprogramadaSeleccionada = this.response.idTareaProgramada;
				//this.formGroupTareaProgramada.value.nombre = this.response.nombre;
				this.usuario = this.response.codigoUsuario;
				console.log('response : ', this.response);


			}
			, err => console.error(err)
		);
	}




	onSubmit_Destinatario() {

		this.dataEnvia = {
			idDestinatarioEmail: this.idDestinatario,
			idTareaProgramada: this.cmbtareaprogramadaSeleccionada,
			codUsuario: this.usuario,
			//codActivo:1,
			usuarioCreacion: 'test',
		}

		console.log('this.dataEnvia : ', this.dataEnvia);



		/* this.service.editardestinatario(this.dataEnvia).subscribe(
		res => {
		  console.log('res de insertar : ', res);
		  this.response = res;
		  if(this.response.message == "OK"){
			swal.fire({
			  title: 'Registro Editado',
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
		  
		  
		  if(this.response.message == "Código no Válido"){
	
			swal.fire({
			  title: 'Registro No Guardado',
			   text: "Se ha ingresado un código de usuaio no válido",
			   icon: 'error',
			   showCancelButton: false,
			   confirmButtonColor: '#3085d6',
			   //cancelButtonColor: '#d33',
			   confirmButtonText: 'OK'
			 })
	
		  }
	
	
		  if(this.response.message == "Código Repetido"){
	
			swal.fire({
			  title: 'Registro No Guardado',
			   text: "Este código de usuario, ya ha sido asignado previamente a esta tarea programada",
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



}