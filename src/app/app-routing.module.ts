import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './ventas/ventas.component';
import { RetirosComponent } from './retiros/retiros.component';
import { ConsignacionesComponent } from './consignaciones/consignaciones.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'retiros', component: RetirosComponent },
  { path: 'consignaciones', component: ConsignacionesComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'clientes', component: ClientesComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(
    routes
  )  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
