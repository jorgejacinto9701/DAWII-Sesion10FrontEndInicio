import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-crud-docente',
  templateUrl: './crud-docente.component.html',
  styleUrls: ['./crud-docente.component.css']
})
export class CrudDocenteComponent implements OnInit {


  filtro:string = "";

  //Ubigeo
  departamentos: string[]  = [];
  provincias: string[]  = [];
  distritos: Ubigeo[]  = [];

  //Grila
  docentes: Docente[] = [];

  //Para Registrar docentes
  docente: Docente = { 
    idDocente:0,
    nombre:"",
    dni:"",
    estado:1,
    ubigeo:{
      idUbigeo: 0,
      departamento:"-1",
      provincia:"-1",
      distrito:"-1",
    }
  };

  constructor(private ubigeoService: UbigeoService, private docenteService:DocenteService) { 
     ubigeoService.listarDepartamento().subscribe(
          response => this.departamentos = response
      );
  }

  consultaDocente(varFiltro:string){
    console.log(" ==> consultaDocente ==> varFiltro ==> " + varFiltro);
    this.docenteService.consultaDocente(varFiltro).subscribe(
        response => this.docentes = response
    );
  }

  cargaProvincia(){
    console.log(" ==> cargaProvincia ==> selDepartamento ==> : " + this.docente.ubigeo?.departamento);
    this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
          response => this.provincias = response      
    );
  }

  cargaDistrito(){
    console.log(" ==> cargaDistrito ==> selDepartamento ==> : " + this.docente.ubigeo?.departamento);
    console.log(" ==> cargaDistrito ==> selProvincia ==> : " + this.docente.ubigeo?.provincia);

    this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
          response => this.distritos = response      
    );
  }

  registra(){
    console.log(" ==> registra ==> ");
    console.log(this.docente);
    this.docenteService.registra(this.docente).subscribe(
          response => {
              console.log(response.mensaje);
              alert(response.mensaje);

              this.docenteService.consultaDocente(this.filtro).subscribe(
                response => this.docentes = response
              );

              this.docente = { 
                  idDocente:0,
                  nombre:"",
                  dni:"",
                  estado:1,
                  ubigeo:{
                    idUbigeo: 0,
                    departamento:"-1",
                    provincia:"-1",
                    distrito:"-1",
                  }
              }
          },
          error => {
            console.log(error);
          },
    );
  }


  actualiza(){
    console.log(" ==> actualiza ==> departamento ==> " + this.docente.ubigeo?.departamento);
    console.log(" ==> actualiza ==> provincia ==> " + this.docente.ubigeo?.provincia);
    console.log(" ==> actualiza ==> distrito ==> " + this.docente.ubigeo?.distrito);
    console.log(" ==> actualiza ==> idUbigeo ==> " + this.docente.ubigeo?.idUbigeo);
    console.log(this.docente);

    this.docenteService.actualiza(this.docente).subscribe(
          response => {
              console.log(response.mensaje);
              alert(response.mensaje);
              
              this.docenteService.consultaDocente(this.filtro).subscribe(
                response => this.docentes = response
              );

              this.docente = { 
                  idDocente:0,
                  nombre:"",
                  dni:"",
                  estado:1,
                  ubigeo:{
                    idUbigeo: 0,
                    departamento:"-1",
                    provincia:"-1",
                    distrito:"-1",
                  }
              }
          },
          error => {
            console.log(error);
          },
    );
  }

  busca(obj:Docente){
    console.log(" ==> busca ==> ");
    this.docente = obj;

    console.log(" ==> busca ==> departamento ==> " + this.docente.ubigeo?.departamento);
    console.log(" ==> busca ==> provincia ==> " + this.docente.ubigeo?.provincia);
    console.log(" ==> busca ==> distrito ==> " + this.docente.ubigeo?.distrito);
    console.log(" ==> busca ==> idUbigeo ==> " + this.docente.ubigeo?.idUbigeo);
    console.log(this.docente);

    this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
      response => this.provincias = response      
    );

    this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
      response => this.distritos = response      
    );

  }

  cambioEstado(idDocente:number, estado:number){
    console.log(" ==> cambioEstado ==>  idDocente ==> " + idDocente);
    console.log(" ==> cambioEstado ==>  estado ==> " + estado);

  }

  getEstado(estado:number):string{
    var salida = "";
    console.log(" ==>  estado ==> " + estado );
    if (estado == 1){
       salida =  "Activo";
    }else{
      salida =  "Inactivo";
    }
    return salida == null? "":salida;
  }

  ngOnInit(): void { }

}
