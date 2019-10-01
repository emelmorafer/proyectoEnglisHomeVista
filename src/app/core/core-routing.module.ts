import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreComponent } from './core.component';

import { AsignarCitaComponent } from '../feature/asignar-cita/asignar-cita.component';
import { ListarCitaComponent } from '../feature/listar-cita/listar-cita.component';
import { AgregarClienteComponent } from '../feature/agregar-cliente/agregar-cliente.component';
import { ListarClienteComponent } from '../feature/listar-cliente/listar-cliente.component';
import { AgregarProfesorComponent } from '../feature/agregar-profesor/agregar-profesor.component';
import { ListarProfesorComponent } from '../feature/listar-profesor/listar-profesor.component';


const coreRoutes: Routes = [
  {
      path: '',
      component: CoreComponent,
      children: [
          {
            path: '',
            component: DashboardComponent
          },
          {
            path: 'asignar-cita',
            component: AsignarCitaComponent,
            children:[
              
            ]
          },
          {
            path: 'listar-citas',
            component: ListarCitaComponent
          },
          {
            path: 'agregar-cliente',
            component: AgregarClienteComponent
          },
          {
            path: 'listar-clientes',
            component: ListarClienteComponent,
          },
          {
            path: 'agregar-profesor',
            component: AgregarProfesorComponent
          },
          {
            path: 'listar-profesores',
            component: ListarProfesorComponent
          }, 
          {
            path: 'listar-citas-apr/:person/:id',
            component: ListarCitaComponent
          },
          {
            path: 'cambiar-estado-cita/:estado/:id',
            component: ListarCitaComponent
          }        
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
