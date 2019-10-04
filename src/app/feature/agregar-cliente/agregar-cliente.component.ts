import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';
import { ActivatedRoute } from '@angular/router';

const cliente = {
  nombre: "",
  apellido: "",
  cedula: "",
  edad: 0,
  direccion: "",
  id: ""
}

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
  respuestaService = cliente;

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteGeneralService) {

    this.agregarClienteForm = new FormGroup({ 
      nombre: new FormControl(''), 
      apellido: new FormControl(''), 
      cedula: new FormControl(''), 
      edad: new FormControl(''), 
      direccion: new FormControl(''), 
      id: new FormControl(''), 
    });
  }

  ngOnInit() {
    this.idCliente = +this.route.snapshot.paramMap.get('id');

    if(this.idCliente!=0){
      this.obtenerCliente(this.idCliente);
    }
  }

  limpiar(limpiarExito: boolean) {
    this.agregarClienteForm.reset();
    
    this.respuestaService = cliente;
    if (limpiarExito) {
      this.mensajeExito = undefined;
    }
    this.mensajeError = undefined;
  }

  agregarCliente() {
    this.mensajeError = undefined;
    console.log(this.agregarClienteForm.value);
    this.clienteService.postAny('/guardarCliente', this.agregarClienteForm.value).subscribe(
      (data: any) => {
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
      (data: any) => {
        console.log(data);

        this.agregarClienteForm.setValue({       
          nombre: data.nombre,       
          apellido: data.apellido,       
          cedula: data.cedula,
          edad: data.edad,       
          direccion: data.direccion,       
          id: data.id     
        });

        this.respuestaService = data;
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }

}
