import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AseguradosService {

  backend: string = 'http://localhost:8888';
  
  constructor( private httpClient : HttpClient) { }

    //ANADIR NUEVO USUARIO
    nuevoAsegurado(data:any) :Observable<any>{
      return this.httpClient.post(`${this.backend}/asegurados/`, {
        nombres: data.nombres,
        apellidos: data.apellidos,
        fechaNacimiento: data.fechaNacimiento,
        fechaAlta: data.fechaAlta,
        poliza: data.poliza,
        certificado: data.certificado,
        empresa: data.empresa,
        numeroIdentidad: data.numeroIdentidad
      });
    }

    //BUSCAR USUARIO POR DNI
    busquedaDNI() :Observable<any>{
      return this.httpClient.get(`${this.backend}/asegurados/identidad`, {});
    }

    //OBTENER ASEGURADO POR SU ID
    obtenerAsegurado(idAseg:any) :Observable<any>{
      return this.httpClient.get(`${this.backend}/asegurados/${idAseg}/id`, {});
    }

    //OBTENER TODOS LOS ASEGURADOS
    generarAsegurados() :Observable<any>{
      return this.httpClient.get(`${this.backend}/asegurados/`, {});
    }

    //ANADIR DEPENDIENTE
    nuevoDependiente(jsonDependiente:any) :Observable<any>{
      return this.httpClient.post(`${this.backend}/asegurados/${jsonDependiente.idAseg}/dependiente`, {
        idAseg : jsonDependiente.idAseg,
        nombres: jsonDependiente.nombres,
        apellidos: jsonDependiente.apellidos,
        identidad: jsonDependiente.identidad,
        parentesco : jsonDependiente.parentesco
      });
    }


}
