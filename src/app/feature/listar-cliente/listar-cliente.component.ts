import { Component, OnInit } from '@angular/core';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss']
})
export class ListarClienteComponent implements OnInit {
  
  public mensajeError: any;
  public mensajeExito: string;

	respuestaService: any[];
	clientes: any[];

  constructor(private clienteService: ClienteGeneralService) { 
      this.respuestaService = [];
      this.clientes = [];	  
  }

  ngOnInit() {
	  this.consultarClientesDisponibles();
  }
  
  
  
  consultarClientesDisponibles() {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    this.clienteService.getAny('/getListCliente').subscribe(
      (data: any[]) => {
        this.clientes = data;
        console.log(this.clientes);
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }  

}
