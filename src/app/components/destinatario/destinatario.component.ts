import { Component, OnInit } from '@angular/core';
import { DestinatarioModel } from 'src/app/models/DestinatarioModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from'sweetalert2';



@Component({
  selector: 'app-destinatario',
  templateUrl: './destinatario.component.html',
  styleUrls: ['./destinatario.component.css']
})

  
  export class DestinatarioComponent implements OnInit {
    ElementData: DestinatarioModel[] = [];
    displayedColumns: string[] = ['idDestinatarioEmail', 'nombreTareaProgramada', 'nombreUsuario','codigoUsuario'];
    dataSource = new MatTableDataSource<DestinatarioModel>(this.ElementData);
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  
    response: any = [{}]
  
  
    constructor(private service: CalendarioService, private router: Router) { }
  
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getDestinatarios();
    }
  
  
    public getDestinatarios() {
      let resp = this.service.listardestinatarios();
      resp.subscribe(report => this.dataSource.data = report as DestinatarioModel[])
      //console.log('res : ', resp)
    }
  
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
  
    btnClickNuevo() {
      this.router.navigateByUrl('/creardestinatario');
    }
  
    editarDestinatarioItem(obj) {
      console.log('editar : ', obj);
      this.router.navigate(['/editardestinatario', Number(obj.idDestinatarioEmail)])
      //this.router.navigate(['/test3', Number(obj.idTareaProgramada)])
    }
  
    borrarDestinatarioItem(obj) {
  
      console.log('obj : ', obj);
  
      swal.fire({
         title: 'Eliminar Destinatario?',
         text: "Esta,seguro de Eliminar este Destinatario!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Si',
         cancelButtonText: 'No',
         reverseButtons: true
       }).then((result) => {
        if (result.isConfirmed)  {
          this.service.eliminardestinatario(obj.idDetinatarioEmail).subscribe(
            res => {
              console.log('obj : ', res);
              if(res == true){
                swal.fire(
                  'Eliminado!',
                  'El destinatario ha sido Eliminado.',
                  'success'
                )
                
              }else{
                swal.fire(
                  'Eliminar',
                  'El destinatario no ha podido ser Eliminado.',
                  'error'
                )
              }
  
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.getDestinatarios();
  
            }
        );
  
            
        
        
        }
  
        })
  
    }
  
  
  }