import { Component, OnInit } from '@angular/core';
import { TareaProgramadaModel } from 'src/app/models/TareaProgramadaModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from'sweetalert2';


@Component({
  selector: 'app-tareaprogramada',
  templateUrl: './tareaprogramada.component.html',
  styleUrls: ['./tareaprogramada.component.css']
})
export class TareaprogramadaComponent implements OnInit {

  ElementData: TareaProgramadaModel[] = [];
  displayedColumns: string[] = ['idTareaProgramada', 'nombre','url'];
  dataSource = new MatTableDataSource<TareaProgramadaModel>(this.ElementData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  response: any = [{}]


  constructor(private service: CalendarioService, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTareasProgramadas();
  }


  public getTareasProgramadas() {
    let resp = this.service.ListarTareasProgramadas();
    resp.subscribe(report => this.dataSource.data = report as TareaProgramadaModel[])
    //console.log('res : ', resp)
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  btnClickNuevo() {
    this.router.navigateByUrl('/creartareaprogramada');
  }

  editTareaProgramadaItem(obj) {
    this.router.navigate(['/editartareaprogramada', Number(obj.idTareaProgramada)])
  }


  borrarTareaProgramadaItem(obj) {

    console.log('obj : ', obj);

    swal.fire({
       title: 'Eliminar Tarea Programada?',
       text: "Esta,seguro de Eliminar esta Tarea Programada!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Si',
       cancelButtonText: 'No',
       reverseButtons: true
     }).then((result) => {
      if (result.isConfirmed)  {
        this.service.EliminarTareaProgramada(obj.idTareaProgramada).subscribe(
          res => {
            console.log('obj : ', res);
            if(res == true){
              swal.fire(
                'Eliminado!',
                'La Tarea Programada ha sido Eliminada.',
                'success'
              )
              
            }else{
              swal.fire(
                'Eliminar',
                'El registro no ha podido ser Eliminado.',
                'error'
              )
            }

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.getTareasProgramadas();

          }
      );

          
      
      
      }

      })

  }


  openDialog(action, obj) {

    console.log('action : ', action);
    console.log('obj : ', obj);
    this.router.navigate(['/editartareaprogramada', Number(obj.idAplicativo)])
  }
}