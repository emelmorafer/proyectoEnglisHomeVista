import { Component, OnInit } from '@angular/core';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-cita',
  templateUrl: './listar-cita.component.html',
  styleUrls: ['./listar-cita.component.scss']
})
export class ListarCitaComponent implements OnInit {

  public mensajeError: any;
  public mensajeExito: string;
  public idCliente: number;
  public idPerson: number;

	respuestaService: any[];
  citas: any[];
  

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteGeneralService) { 
    this.respuestaService = [];
    this.citas = [];	  
  }

  ngOnInit() {
    this.idCliente = +this.route.snapshot.paramMap.get('id');
    this.idPerson = +this.route.snapshot.paramMap.get('person');

    if(this.idCliente==0 && this.idPerson==0){
      this.consultarCitasDisponibles();
    }else{    
        if(this.idPerson==1){
          this.consultarCitasAprobadasPorCliente(this.idCliente);
        }else{
          this.consultarCitasAprobadasPorProfesor(this.idCliente);
        }  
    };
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

  consultarCitasAprobadasPorCliente(id: any) {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    this.clienteService.getAny('/getListCitasAprobadasByIdCliente?idCliente=' + id).subscribe(
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

  consultarCitasAprobadasPorProfesor(id: any) {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    this.clienteService.getAny('/getListCitasAprobadasByIdProfesor?idProfesor=' + id).subscribe(
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

  aprobarCita(id: any) {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    this.clienteService.getAny('/aprobarCitaPorId?id=' + id).subscribe(
      (data: any[]) => {
        this.consultarCitasDisponibles();
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }

  rechazarCita(id: any) {
    this.mensajeExito = undefined;
    this.mensajeError = undefined;
    this.clienteService.getAny('/rechazarCitaPorId?id=' + id).subscribe(
      (data: any[]) => {
        this.consultarCitasDisponibles();
      },
      (error) => {
        this.mensajeError = (error.error.message || error.message || 'Error interno de servidor');
        console.log(error.error.message || error.error || 'Error interno de servidor');
      }
    );
  }


}
