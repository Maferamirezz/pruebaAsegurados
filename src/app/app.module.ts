import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { AseguradosComponent } from './components/asegurados/asegurados.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    AseguradosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
