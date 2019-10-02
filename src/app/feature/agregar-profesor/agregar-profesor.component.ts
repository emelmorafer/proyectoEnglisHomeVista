import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-profesor',
  templateUrl: './agregar-profesor.component.html',
  styleUrls: ['./agregar-profesor.component.scss']
})
export class AgregarProfesorComponent implements OnInit {

  public mensajeError: any;
  public mensajeExito: string;
  public idProfesor: number;

  agregarClienteForm: FormGroup;
  respuestaService: any[];
  profesores: any[];

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteGeneralService) { 
    this.agregarClienteForm = new FormGroup({});
    this.profesores = [];
  }

  ngOnInit() {
    this.idProfesor = +this.route.snapshot.paramMap.get('id');

    if(this.idProfesor!=0){
      this.obtenerProfesor(this.idProfesor);
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

  agregarProfesor(form: any) {
    this.mensajeError = undefined;
    console.log(JSON.stringify(form.value));
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

  obtenerProfesor(id: any) {
    this.mensajeError = undefined;
    this.clienteService.getAny('/getProfesorById?id=' + id).subscribe(
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
