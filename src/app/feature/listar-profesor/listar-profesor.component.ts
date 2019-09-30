import { Component, OnInit } from '@angular/core';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';

@Component({
  selector: 'app-listar-profesor',
  templateUrl: './listar-profesor.component.html',
  styleUrls: ['./listar-profesor.component.scss']
})
export class ListarProfesorComponent implements OnInit {
  
  public mensajeError: any;
  public mensajeExito: string;

	respuestaService: any[];
	profesores: any[];

  constructor(private clienteService: ClienteGeneralService) { 
      this.respuestaService = [];
      this.profesores = [];	  
  }

  ngOnInit() {
	  this.consultarprofesoresDisponibles();
  }
  
  
  
  consultarprofesoresDisponibles() {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    this.clienteService.getAny('/getListProfesor').subscribe(
      (data: any[]) => {
        this.profesores = data;
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }  

}