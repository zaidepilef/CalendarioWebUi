import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from'sweetalert2';


@Component({
  selector: 'app-creartareaprogramada',
  templateUrl: './creartareaprogramada.component.html',
  styleUrls: ['./creartareaprogramada.component.css']
})
export class CreartareaprogramadaComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  //cajas formulario
  botonAgregar: boolean;
  codActivo:number;
  usuarioCreacion: string;
  //formulario: FormGroup;
  nombre: string;
  url:string;

  //objeto al API
  dataEnvia: any = {}
  response: any = [{}]
  //formularioTareaProgramada: boolean;
  formGroupTareaProgramada: FormGroup;


  constructor(private fb: FormBuilder, private service: CalendarioService, private router: Router, private ref: ChangeDetectorRef) {

   /*  this.formulario = this.fb.group({
      nombre: new FormControl('',[Validators.required]),
      url: new FormControl('',[Validators.required])
    }); */


  }

  ngOnInit(): void {

    this.formGroupTareaProgramada = this.fb.group({
			nombre: ['', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(50)
				//.pattern('^[a-zA-Z0-9]*$')
			]],
			url: ['', [
        Validators.required,
        Validators.maxLength(100)
			]],
		});


  }


  onSubmit_tareaprogramada() {

    this.dataEnvia = {
      nombre: this.nombre,
      url:this.url,
      codActivo:1,
      usuarioCreacion:'test',
    }


    this.service.BuscarTareaProgramadaByNombre(this.nombre).subscribe(
      res => {
        console.log('res de Buscar : ', res);
        this.response = res;
        if(this.response.nombre != ""){
          swal.fire({
            title: 'Registro No Guardado',
             text: "Este nombre de Tarea, ya fue asignado previamente",
             icon: 'error',
             showCancelButton: false,
             confirmButtonColor: '#3085d6',
             //cancelButtonColor: '#d33',
             confirmButtonText: 'OK'
           })
           /* .then((result) => {
             if (result.isConfirmed) {
              this.router.navigateByUrl('/tareas');
             }
           }) */

        }else{
          
          this.service.InsertarTareaProgramada(this.dataEnvia).subscribe(
            res => {
              console.log('res de insertar : ', res);
              this.response = res;
              if(this.response.message == "OK"){
                swal.fire({
                  title: 'Tarea Programada Guardada',
                   text: "",
                   icon: 'success',
                   showCancelButton: false,
                   confirmButtonColor: '#3085d6',
                   //cancelButtonColor: '#d33',
                   confirmButtonText: 'OK'
                 }).then((result) => {
                   if (result.isConfirmed) {
                    this.router.navigateByUrl('/tareas');
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
                    this.router.navigateByUrl('/tareas');
                   }
                 })
      
              }
            
            }
            //, err => console.error(err)
          );

        }
      
      }
          
      );


  
  }


  Volver() {
    this.router.navigateByUrl('/tareas');
  }

}