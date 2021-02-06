import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-editartareaprogramada',
  templateUrl: './editartareaprogramada.component.html',
  styleUrls: ['./editartareaprogramada.component.css']
})
export class EditartareaprogramadaComponent implements OnInit {

  idTareaProgramada: number;
  botonAgregar: boolean;
  nombre: string;
  url: string;
  codActivo:number;


  form: FormGroup;
  response: any = {
    message: "",
    nombre: "",
    url: ""
  };

  formGroupTareaProgramada: FormGroup;
  //objeto al API
  dataEnvia: any = {}
  responseEditar: any = [{}]

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private service: CalendarioService, private router: Router) {

   /*  this.form = this.fb.group({
      nombre: new FormControl('',[Validators.required]),
      url: new FormControl('',[Validators.required])
    }); */
  
  }


  ngOnInit(): void {

    let params: any = this.activatedRoute.snapshot.params;
    this.idTareaProgramada = Number(params.id)
    console.log('id : ', params.id);

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



    this.BuscaTareaProgramada(params.id);

  }

  BuscaTareaProgramada(id: any) {

    this.service.BuscarTareaProgramadaByIdTarea(id).subscribe(
      res => {
        this.response = res;
        this.nombre = this.response.nombre;
        //this.formGroupTareaProgramada.value.nombre = this.response.nombre;
        this.url = this.response.url;
        console.log('response : ', this.response);

      
      }
      , err => console.error(err)
    );
  }

  onSubmit_tareaprogramada() {

    this.dataEnvia = {
      idTareaProgramada: this.idTareaProgramada,
      nombre: this.nombre,
      url: this.url,
      codActivo: 1,
    }



    this.service.BuscarTareaProgramadaByNombre(this.nombre).subscribe(
      res => {
        console.log('res de Buscar : ', res);
        this.response = res;
        if(this.response.nombre != "" && this.response.idTareaProgramada != this.idTareaProgramada){
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
          
          this.service.EditarTareaProgramada(this.dataEnvia).subscribe(
            res => {
              console.log('res de editar : ', res);
              //this.response = res;
              if(res == true){
                swal.fire({
                  title: 'Tarea Programada Editada',
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
                  title: 'Registro No Editado',
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