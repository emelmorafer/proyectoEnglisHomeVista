import { Component, OnInit } from '@angular/core';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';

@Component({
  selector: 'app-listar-cita',
  templateUrl: './listar-cita.component.html',
  styleUrls: ['./listar-cita.component.scss']
})
export class ListarCitaComponent implements OnInit {

  public mensajeError: any;
  public mensajeExito: string;

	respuestaService: any[];
	citas: any[];

  constructor(private clienteService: ClienteGeneralService) { 
    this.respuestaService = [];
    this.citas = [];	  
  }

  ngOnInit() {
	  this.consultarCitasDisponibles();
  }

  consultarCitasDisponibles() {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    this.clienteService.getAny('/getListCita').subscribe(
      (data: any[]) => {
        this.citas = data;
        console.log(this.citas);
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  } 

}
