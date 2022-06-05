import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-docente',
  templateUrl: './crud-docente.component.html',
  styleUrls: ['./crud-docente.component.css']
})
export class CrudDocenteComponent implements OnInit {

  //Para la Grilla
   docentes: Docente [] = [];
   filtro: string ="";
 
   //Para el ubigeo
   departamentos: string[] = [];;
   provincias: string[] = [];;
   distritos: Ubigeo[] = [];;

   
  //Json para registrar o actualizar
  docente: Docente = { 
    idDocente:0,
    nombre:"",
    dni:"",
    estado:1,
    ubigeo:{
      idUbigeo: -1,
      departamento:"-1",
      provincia:"-1",
      distrito:"-1",
    }
  };

  //Declaracion de validaciones
    formsRegistra = new FormGroup({
      validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
      validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
      validaDepartamento: new FormControl('', [Validators.min(1)]),
      validaProvincia: new FormControl('', [Validators.min(1)]),
      validaDistrito: new FormControl('', [Validators.min(1)]),
  });

  formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaDepartamento: new FormControl('', [Validators.min(1)]),
    validaProvincia: new FormControl('', [Validators.min(1)]),
    validaDistrito: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  //para verificar que e pulsó el boton
  submitted = false;

  constructor(private docenteService:DocenteService, private ubigeoService:UbigeoService) {
      this.ubigeoService.listarDepartamento().subscribe(
          response => this.departamentos = response
      );            
  }

  cargaProvincia(){
      this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
        response =>  this.provincias= response
      );

      this.docente!.ubigeo!.provincia = "-1";
      this.distritos = [];
      this.docente!.ubigeo!.idUbigeo = -1;

  }

  cargaDistrito(){
    this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
      response =>  this.distritos= response
     );

     this.docente!.ubigeo!.idUbigeo = -1;
   }

  ngOnInit(): void {
  }

  consulta(){
      this.docenteService.listaDocente(this.filtro==""?"todos":this.filtro).subscribe(
            (x) => this.docentes = x
      );
  }

  actualizaEstado(aux : Docente){
        aux.estado = aux.estado == 0? 1 :0;
        this.docenteService.actualizaDocente(aux).subscribe();
  }

  registra(){
       this.submitted = true;

        //finaliza el método si hay un error
        if (this.formsRegistra.invalid){
         return;
        }
        
        this.submitted = false;

        this.docenteService.registraDocente(this.docente).subscribe(
              (x) => {
                document.getElementById("btn_reg_cerrar")?.click();
                alert(x.mensaje);
                this.docenteService.listaDocente(this.filtro==""?"todos":this.filtro).subscribe(
                        (x) => this.docentes = x
                );
              } 
        );

        //limpiar los comobobox
        this.distritos = [];
        this.provincias = [];

        //limpiar los componentes del formulario a través de los ngModel

        this.docente = { 
              idDocente:0,
              nombre:"",
              dni:"",
              estado:1,
              ubigeo:{
                idUbigeo: -1,
                departamento:"-1",
                provincia:"-1",
                distrito:"-1",
              }
        }
  }

  buscar(aux :Docente){
        this.docente  = aux;

        this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
          response =>  this.provincias= response
        );

      this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
        response =>  this.distritos= response
      );

  }


  actualiza(){
    this.submitted = true;

    //finaliza el método si hay un error
    if (this.formsActualiza.invalid){
     return;
    }

    this.submitted = false;

    this.docenteService.actualizaDocente(this.docente).subscribe(
          (x) => {
            document.getElementById("btn_act_cerrar")?.click();
            alert(x.mensaje);
            this.docenteService.listaDocente(this.filtro==""?"todos":this.filtro).subscribe(
                    (x) => this.docentes = x
            );
          } 
    );

    //limpiar los comobobox
    this.distritos = [];
    this.provincias = [];

    //limpiar los componentes del formulario a través de los ngModel

    this.docente = { 
          idDocente:0,
          nombre:"",
          dni:"",
          estado:1,
          ubigeo:{
            idUbigeo: -1,
            departamento:"-1",
            provincia:"-1",
            distrito:"-1",
          }
    }
}


}



