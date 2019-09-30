import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  public mensajeError: any;
  public mensajeExito: string;

  agregarClienteForm: FormGroup;
  respuestaService: any[];
  clientes: any[];

  constructor(private clienteService: ClienteGeneralService) {
    this.agregarClienteForm = new FormGroup({});
    this.respuestaService = [];
    this.clientes = [];
  }

  ngOnInit() {

  }

  limpiar(limpiarExito: boolean) {
    this.agregarClienteForm.reset();
    
    this.respuestaService = [];
    if (limpiarExito) {
      this.mensajeExito = undefined;
    }
    this.mensajeError = undefined;
  }

  agregarCliente(form: { value: any; }) {
    this.mensajeError = undefined;
    this.clienteService.postAny('/guardarCliente', form.value).subscribe(
      (data: any[]) => {
        this.clientes = data;
        this.mensajeExito = 'El nuevo cliente ha sido ingresado de forma exitosa';
        this.limpiar(false);
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }

}
