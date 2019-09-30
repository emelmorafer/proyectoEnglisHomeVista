import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignarCitaComponent } from './asignar-cita/asignar-cita.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { ListarProfesorComponent } from './listar-profesor/listar-profesor.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { AgregarProfesorComponent } from './agregar-profesor/agregar-profesor.component';
import { ListarCitaComponent } from './listar-cita/listar-cita.component';



@NgModule({
  declarations: [AsignarCitaComponent, ListarClienteComponent, ListarProfesorComponent, AgregarClienteComponent, AgregarProfesorComponent, ListarCitaComponent],
  imports: [
    CommonModule
  ]
})
export class FeatureModule { }
