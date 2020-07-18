import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VentasComponent } from './ventas/ventas.component';
import { RetirosComponent } from './retiros/retiros.component';
import { ConsignacionesComponent } from './consignaciones/consignaciones.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { LoginService } from './login/login.service';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { environment } from 'src/environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import { NavbarComponent } from './template/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VentasComponent,
    RetirosComponent,
    ConsignacionesComponent,
    ClientesComponent,
    EmpresaComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [LoginService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
