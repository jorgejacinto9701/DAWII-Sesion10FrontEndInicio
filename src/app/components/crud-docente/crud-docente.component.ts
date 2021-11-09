import { Component, OnInit } from '@angular/core';
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

  selDepartamento:string = ""; 
  selProvincia:string = ""; 
  selDistrito:number = 0;

  filtro:string = "";

  //Ubigeo
  departamentos: string[]  = [];
  provincias: string[]  = [];
  distritos: Ubigeo[]  = [];

  //Grila
  docentes: Docente[] = [];


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
    this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(
          response => this.provincias = response      
    );
  }

  cargaDistrito(){
    this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
          response => this.distritos = response      
    );
  }

  ngOnInit(): void { }

}
