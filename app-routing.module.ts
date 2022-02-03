import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AseguradosComponent } from './components/asegurados/asegurados.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'asegurados/:idAseg', component: AseguradosComponent},
  { path: 'paginaPrincipal', component: PaginaPrincipalComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
