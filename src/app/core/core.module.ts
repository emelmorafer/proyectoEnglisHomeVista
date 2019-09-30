import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreComponent } from './core.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreRoutingModule } from './core-routing.module';

import { AsignarCitaComponent } from '../feature/asignar-cita/asignar-cita.component';
import { ListarCitaComponent } from '../feature/listar-cita/listar-cita.component';
import { AgregarClienteComponent } from '../feature/agregar-cliente/agregar-cliente.component';
import { ListarClienteComponent } from '../feature/listar-cliente/listar-cliente.component';
import { AgregarProfesorComponent } from '../feature/agregar-profesor/agregar-profesor.component';
import { ListarProfesorComponent } from '../feature/listar-profesor/listar-profesor.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { ClienteGeneralService } from './cliente-general.service';


@NgModule({
  declarations: [
    CoreComponent,
    DashboardComponent,
    NavbarComponent,
    AsignarCitaComponent,
    ListarCitaComponent,
    AgregarClienteComponent,
    ListarClienteComponent,
    AgregarProfesorComponent,
    ListarProfesorComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgTempusdominusBootstrapModule,
    HttpClientModule
  ],
  exports: [CoreComponent],
  providers: [ClienteGeneralService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CoreModule { }
