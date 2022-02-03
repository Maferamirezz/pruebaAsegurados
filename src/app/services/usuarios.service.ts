import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  backend: string = 'http://localhost:8888';
  
  constructor( private httpClient : HttpClient ) { }

  //OBTENER UN USUARIO
  obtenerUsuario(email:string) :Observable<any>{
    return this.httpClient.get(`${this.backend}/usuarios/${email}`, {});
  }

}
