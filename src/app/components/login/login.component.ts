import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Declaracion del grupo de componentes que son utilizados en el formuario del login
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    contrasenia: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor( private router: Router, private usuariosService: UsuariosService ) { }

  ngOnInit(): void {
  }

  //Se encarga de retornar los controles del formulario 
  get f(){
    return this.login.controls;
  }

  //Se encarga de retornar el usuario
  get email(){
    return this.login.get('email')
  }

  //Se encarga de retornar la contrasenia
  get contrasenia(){
    return this.login.get('contrasenia')
  }

  /*
  Funcion que permite al usuario ingresar al sistema.
  Sus principales objetivos son: verificar que el formulario sea valido, buscar el usuario y la contrasenia en la BD,
  si existe, continuar la navegacion; caso contrario solicitar al usuario ingresar nuevamente sus credenciales. 
  */
  ingresar(){
    if (this.login.valid){
      this.usuariosService.obtenerUsuario(this.login.controls['email'].value).subscribe(
        res=>{
          console.log(res)
          this.router.navigate(['/paginaPrincipal']);
          if( this.login.controls['email'].value == res.email && this.login.controls['contrasenia'].value == res.contrasenia ){
            this.router.navigate(['/paginaPrincipal']);
          }else{
            console.log("Escriba de nuevo sus credenciales");
          }
        },
          error=>{
            console.log(error);
          }
      );
    }
  }
}
