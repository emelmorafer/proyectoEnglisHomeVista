import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';

@Component({
  selector: 'app-agregar-profesor',
  templateUrl: './agregar-profesor.component.html',
  styleUrls: ['./agregar-profesor.component.scss']
})
export class AgregarProfesorComponent implements OnInit {

  public mensajeError: any;
  public mensajeExito: string;

  agregarClienteForm: FormGroup;
  respuestaService: any[];
  profesores: any[];

  constructor(private clienteService: ClienteGeneralService) { 
    this.agregarClienteForm = new FormGroup({});
    this.respuestaService = [];
    this.profesores = [];
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

  agregarProfesor(form: { value: any; }) {
    this.mensajeError = undefined;
    this.clienteService.postAny('/guardarProfesor', form.value).subscribe(
      (data: any[]) => {
        this.profesores = data;
        this.mensajeExito = 'El nuevo profesor ha sido ingresado de forma exitosa';
        this.limpiar(false);
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }

}
