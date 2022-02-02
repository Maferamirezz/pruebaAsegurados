import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-asegurados',
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.css']
})
export class AseguradosComponent implements OnInit {

  //Variables Form Control

  //Variables Front
  dependientesActivos : boolean = false;

  //Variables Type

  constructor() { }

  ngOnInit(): void {

    //Service para cargar la info del asegurado y sus dependientes lo primero al cargar la página 
  }

  mostrarFormulario(){
    //debe mostrar el formulario
  }

  guardarDependiente(){
    //funcion para añadir dependiente al asegurado
  }
}
