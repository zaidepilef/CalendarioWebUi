import { Component, OnInit } from '@angular/core';
import { CalendarioTareasProgramadasModel } from 'src/app/models/CalendarioTareasProgramadasModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-calendarizacion',
  templateUrl: './calendarizacion.component.html',
  styleUrls: ['./calendarizacion.component.css']
})
export class CalendarizacionComponent implements OnInit {

  ElementData: CalendarioTareasProgramadasModel[] = [];
  displayedColumns: string[] = ['idTareaProgramada', 'nombreTareaProgramada', 'codPeriodicidadProceso', 'nombrePeriodicidad',];
  dataSource = new MatTableDataSource<CalendarioTareasProgramadasModel>(this.ElementData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: CalendarioService, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCalendarizacion();
  }


  public getCalendarizacion() {
    let resp = this.service.listartarcalendarizacion();
    resp.subscribe(report => this.dataSource.data = report as CalendarioTareasProgramadasModel[])
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  btnClickNuevo() {
    this.router.navigateByUrl('/crearcalendarizacion');
    //this.router.navigateByUrl('/test4');
  }

  editTareaItem(obj) {
    console.log('editar : ', obj);
    this.router.navigate(['/editarcalendarizacion', Number(obj.idTareaProgramada)])
    //this.router.navigate(['/test3', Number(obj.idTareaProgramada)])
  }


  borrarTareaItem(obj) {

    console.log('obj : ', obj);


    swal.fire({
      title: 'Eliminar Calendarización?',
      text: "Esta,seguro de Eliminar esta Calendarización!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
     if (result.isConfirmed)  {
      this.service.EliminarCalendarizacion(obj.idTareaProgramada).subscribe(
         res => {
           console.log('obj : ', res);
           if(res == true){
             swal.fire(
               'Eliminado!',
               'La Calendarización ha sido Eliminada.',
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
           this.getCalendarizacion();

         }
     );

         
     
     
     }

     })


  }


  openDialog(action, obj) {

    console.log('action : ', action);
    console.log('obj : ', obj);
    this.router.navigate(['/editarCalendarizacion', Number(obj.idTareaProgramada)])
  }

}