import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  //Variables Form Control

  //Variables Front
  area1 : boolean =true;
  area2 : boolean = true;
  formularioRegistro : boolean = false;
  tabla : boolean = false; 

  //Variables Type

  constructor() { }

  ngOnInit(): void {
  }

  irAsegurado(){
//Routing Angular para ir al otro componente y mostrar la informacion
  }

  irConsulta(){
    this.area1=false;
    this.tabla=true;
  }

  irRegistro(){
    this.formularioRegistro==true;
    this.area2=false;
  }

  guardarAsegurado(){
    //Verificar numero identidad bd
    //Si esta mandar mensaje, sino guardar y regresar a todo lo demás
  }
}
