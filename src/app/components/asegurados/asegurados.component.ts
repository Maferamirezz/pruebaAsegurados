import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

import { AseguradosService } from 'src/app/services/asegurados.service';

@Component({
  selector: 'app-asegurados',
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.css']
})
export class AseguradosComponent implements OnInit {

  //Variables Front
  dependientesActivos : boolean = false;
  formularioDependiente : boolean = false;

  //Variables Type
  idAseg : string = '';
  asegurado : any = [];
  dependientes : any = [];

  //Declaracion del grupo de componentes que son utilizados en el formuario del login
  registroDependiente = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    identidad: new FormControl('', [Validators.required, Validators.maxLength(14)]),
    parentesco: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });

    @ViewChild('div') htmlData!:ElementRef;

  constructor( private router: Router, private aseguradosService : AseguradosService, private route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      this.idAseg = params['idAseg'];
      //console.log(this.idAseg);
    });

    this.aseguradosService.obtenerAsegurado(this.idAseg).subscribe(
      res=>{
        this.asegurado=res
        console.log(this.asegurado)
      },
      error=>{
        console.log(error);
      }
    )
    
  }

    //Se encarga de retornar los controles del formulario 
    get f(){
      return this.registroDependiente.controls;
    }
  
    //Se encarga de retornar los nombres del dependiete del asegurado
    get nombres(){
      return this.registroDependiente.get('nombres')
    }
  
    //Se encarga de retornar los apellidos del dependiente del asegurado
    get apellidos(){
      return this.registroDependiente.get('apellidos')
    }
  
    //Se encarga de retornar el numero de identidad del dependiente del asegurado
    get identidad(){
      return this.registroDependiente.get('identidad')
    }

  mostrarFormulario(){
    //debe mostrar el formulario
    this.formularioDependiente = true;
  }

  /*
  Funcion que permite guardar un nuevo dependiente del asegurado al sistema.
  Sus principales objetivos son: verificar que el numero de identidad del dependiente sea unico (que no exista en la bd),
  en caso de existir, mostrar un mensaje al usuario que esa accion no esta permitida, sino, guardar y notificar al usuario
  que la accion tuvo exito.
  */
  guardarDependiente(){

    const jsonDep = {
      idAseg : this.idAseg,
      nombres : this.registroDependiente.controls['nombres'].value,
      apellidos : this.registroDependiente.controls['apellidos'].value,
      parentesco : this.registroDependiente.controls['parentesco'].value,
      identidad : this.registroDependiente.controls['identidad'].value
    }

    //console.log(jsonDep)
    //funcion para añadir dependiente al asegurado
    if (this.registroDependiente.valid){
      //console.log(this.asegurado.dependientes.length)
      if(this.asegurado.dependientes.length==0){
        this.aseguradosService.nuevoDependiente(jsonDep).subscribe(
          res=>{
            console.log(res)
            this.dependientes.push(jsonDep)
          },
          error=>{
            console.log(error)
          }
        )
      }else{
        for ( let i=0; i<this.asegurado.dependientes[i].length; i++){
          this.dependientes.push(this.asegurado.dependientes[i])
          if(this.registroDependiente.controls['identidad'].value == this.asegurado.dependientes[i].identidad){
            console.log("No se puede insertar")
          }else{
            this.aseguradosService.nuevoDependiente(jsonDep).subscribe(
              res=>{
                console.log(res)
                console.log(this.dependientes)
              },
              error=>{
                console.log(error)
              }
            )
          }
        }
      }

    }

  }

  /* 
  La funcion permite crear un documento pdf a base de un fragmento del diseno del codigo, a traves de llamar al componente hijo.
  */
  public openPDF():void {
    let DATA = document.getElementById('tarjeta');
      
    html2canvas(DATA!).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'letter', true);
        let position = 0;
        PDF.addImage(FILEURI, 'JPG', 0, position, fileWidth, fileHeight)
        
        PDF.save(`carne.pdf`);
    });     
  }
}
