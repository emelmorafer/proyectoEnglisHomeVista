import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';

@Component({
  selector: 'app-asignar-cita',
  templateUrl: './asignar-cita.component.html',
  styleUrls: ['./asignar-cita.component.scss']
})
export class AsignarCitaComponent implements OnInit {

  options: any = {format: 'DD/MM/YYYY HH:mm', buttons: {showClear: false}};
  date = null;

  public mensajeError: any;
  public mensajeExito: string;
  public citaValida: any;

  asignarCitaForm: FormGroup;
  respuestaService: any[];
  profesores: any[];
  clientes: any[];

  constructor(private clienteService: ClienteGeneralService) {
    this.asignarCitaForm = new FormGroup({});
    this.respuestaService = [];
    this.profesores = [];
	  this.clientes = [];
  }
  
  
  ngOnInit() {
    const test = moment.defaultFormatUtc;
    console.log(test);
    const fechaActual = moment(new Date(), 'YYYY/MM/DD HH:mm').minutes(0).seconds(0).milliseconds(0).utc(true);
    
    this.options.minDate = fechaActual;
	
	  this.consultarProfesoresDisponibles();
	  this.consultarClientesDisponibles();
  }

  obtenerValor(form: { value: any; }) {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    console.log(form.value);
    this.clienteService.postAny('/calcularPrecioCita', form.value).subscribe(
      (data: any[]) => {
        console.log(data);
        this.respuestaService = data;
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }

  limpiar(limpiarExito: boolean) {
    this.asignarCitaForm.reset();
    
    this.respuestaService = [];
    if (limpiarExito) {
      this.mensajeExito = undefined;
    }
    this.mensajeError = undefined;
    this.citaValida = false; 
  }

  consultarProfesoresDisponibles() {
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
  
  consultarClientesDisponibles() {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    this.clienteService.getAny('/getListCliente').subscribe(
      (data: any[]) => {
        this.clientes = data;
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }

  asignarCita(form: any) {
    this.mensajeError = undefined;
    console.log(JSON.stringify(form.value));
    this.clienteService.postAny('/guardarCita', form.value).subscribe(
      (data: any[]) => {
        this.clientes = data;
        this.mensajeExito = 'Se ha creado de manera exitosa su cita.';
        this.limpiar(false);
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }    
    );
  }
  
  verificarValidesGuardadoDeCita(form: any) {
    this.mensajeError = undefined;
    console.log(JSON.stringify(form.value));
    this.clienteService.postAny('/verificarValidesGuardadoDeCita', form.value).subscribe(
      (data: any[]) => {
        this.citaValida = data;

        if(this.citaValida){
          this.asignarCita(form);
        }else{
          this.mensajeError = ('Esta cita se cruza con otra del mismo profesor');
          console.log('Esta cita se cruza con otra del mismo profesor');
        }
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }
  
}
