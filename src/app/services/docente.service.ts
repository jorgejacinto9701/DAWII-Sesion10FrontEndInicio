import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';

const baseUrl = 'http://localhost:8090/rest/crudDocente';

@Injectable({
  providedIn: 'root'
})


export class DocenteService {


  constructor(private http:HttpClient) { }
 
  consulta(filtro:string):Observable<Docente[]>{
      return this.http.get<Docente[]>(baseUrl + "/listaDocentePorNombreLike/" +filtro );
  }

  registra(aux:Docente):Observable<any>{
      return this.http.post<any>(baseUrl+"/registraDocente",aux);
  }

  actualiza(aux:Docente):Observable<any>{
      return this.http.put<any>(baseUrl+"/actualizaDocente",aux);
  }

}
