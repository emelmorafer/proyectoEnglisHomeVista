import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  public mensajeError: any;
  public mensajeExito: string;
  public idCliente: number;

  agregarClienteForm: FormGroup;
  respuestaService: any[];
  clientes: any[];

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteGeneralService) {
    this.agregarClienteForm = new FormGroup({}); 
    this.clientes = [];
  }

  ngOnInit() {
    this.idCliente = +this.route.snapshot.paramMap.get('id');

    if(this.idCliente!=0){
      this.obtenerCliente(this.idCliente);
    }else{ 
      this.respuestaService = []; 
    };
  }

  limpiar(limpiarExito: boolean) {
    this.agregarClienteForm.reset();
    
    this.respuestaService = [];
    if (limpiarExito) {
      this.mensajeExito = undefined;
    }
    this.mensajeError = undefined;
  }

  agregarCliente(form: any) {
    this.mensajeError = undefined;
    console.log(JSON.stringify(form.value));
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

  obtenerCliente(id: any) {
    this.mensajeError = undefined;
    this.clienteService.getAny('/getClienteById?id=' + id).subscribe(
      (data: any[]) => {
        this.respuestaService = data;
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }

}
