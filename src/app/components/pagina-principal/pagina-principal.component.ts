import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AseguradosService } from 'src/app/services/asegurados.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  //Variables Front
  area1 : boolean =true;
  area2 : boolean = true;
  formularioRegistro : boolean = false;
  tabla : boolean = false; 

  //Variables Type
  dnis : any = [];
  asegurados : any = [];

  //Declaracion del grupo de componentes que son utilizados en el formuario del login
  registro = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    nacimiento: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    identidad: new FormControl('', [Validators.required, Validators.minLength(14)]),
    fechaalta: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    empresa: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    poliza: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    certificado: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  constructor( private router: Router, private aseguradosService : AseguradosService ) { }

  ngOnInit(): void {

    this.aseguradosService.generarAsegurados().subscribe(
      res=>{this.asegurados=res
      },
        error=>{
          console.log(error);
        }
    )
    
  }

  //Se encarga de retornar los controles del formulario 
  get f(){
    return this.registro.controls;
  }

  //Se encarga de retornar los nombres del asegurado
  get nombres(){
    return this.registro.get('nombres')
  }

  //Se encarga de retornar los apellidos del asegurado
  get apellidos(){
    return this.registro.get('apellidos')
  }

  //Se encarga de retornar la fecha de nacimiento del asegurado
  get nacimiento(){
    return this.registro.get('nacimiento')
  }

  //Se encarga de retornar el numero de identidad del asegurado
  get identidad(){
    return this.registro.get('identidad')
  }

  //Se encarga de retornar la fecha de alta del asegurado
  get fechaalta(){
    return this.registro.get('fechaalta')
  }

  //Se encarga de retornar la empresa del asegurado   
  get empresa(){
    return this.registro.get('empresa')
  }

  //Se encarga de retornar la poliza del asegurado
  get poliza(){
    return this.registro.get('poliza')
  }

  //Se encarga de retornar el certificado del asegurado
  get certificado(){
    return this.registro.get('certificado')
  }

  irAsegurado(idAseg:Number){
    this.router.navigate(['/asegurados', idAseg]);
  }

  irConsulta(){
    this.area1=false;
    this.tabla=true;
  }

  irRegistro(){
    this.formularioRegistro=true;
    this.area2=false;
  }

  /*
  Funcion que permite guardar un nuevo asegurado al sistema.
  Sus principales objetivos son: verificar que el numero de identidad del usuario sea unico (que no exista en la bd),
  en caso de existir, mostrar un mensaje al usuario que esa accion no esta permitida, sino, guardar y notificar al usuario
  que la accion tuvo exito.
  */
  guardarAsegurado(){

    //JSON extraido del formulario y ordenado
    const data = {
      nombres : this.registro.controls['nombres'].value,
      apellidos : this.registro.controls['apellidos'].value,
      fechaNacimiento : this.registro.controls['nacimiento'].value,
      fechaAlta : this.registro.controls['fechaalta'].value,
      poliza : this.registro.controls['poliza'].value,
      certificado : this.registro.controls['certificado'].value,
      empresa : this.registro.controls['empresa'].value,
      numeroIdentidad : this.registro.controls['identidad'].value
    }

    if (this.registro.valid){
      //ejecutar service que busque numero de identidad
      this.aseguradosService.busquedaDNI().subscribe(
        res=>{
          this.dnis=res
          console.log(this.dnis)
          for(let i =0; i<this.dnis.length; i++){
            if(this.dnis.length==0){
              this.aseguradosService.nuevoAsegurado(data).subscribe(
                res=>{
                  console.log(res);
                },
                error=>{
                  console.log(error);
                }
              )
            }else{
              if(this.registro.controls['identidad'].value==this.dnis[i].numeroIdentidad){
                //No se puede insertat
                //AGREGAR MODAL
                console.log(this.dnis[i].numeroIdentidad)
              }else{
                this.aseguradosService.nuevoAsegurado(data).subscribe(
                  res=>{
                    console.log(res);
                  },
                  error=>{
                    console.log(error);
                  }
                )
              }
            }
          }
        },
        error=>{
          console.log(error);
        }
      )
    }
  }
}
