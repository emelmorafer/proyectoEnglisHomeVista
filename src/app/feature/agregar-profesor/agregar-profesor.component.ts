import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteGeneralService } from 'src/app/core/cliente-general.service';
import { ActivatedRoute } from '@angular/router';

const profesor = {
  nombre: "",
  apellido: "",
  cedula: "",
  edad: 0,
  direccion: "",
  id: ""
}

@Component({
  selector: 'app-agregar-profesor',
  templateUrl: './agregar-profesor.component.html',
  styleUrls: ['./agregar-profesor.component.scss']
})
export class AgregarProfesorComponent implements OnInit {

  public mensajeError: any;
  public mensajeExito: string;
  public idProfesor: number;

  agregarProfesorForm: FormGroup;
  respuestaService = profesor;

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteGeneralService) { 
    this.agregarProfesorForm = new FormGroup({ 
      nombre: new FormControl(''), 
      apellido: new FormControl(''), 
      cedula: new FormControl(''), 
      edad: new FormControl(''), 
      direccion: new FormControl(''), 
      id: new FormControl(''), 
    });
  }

  ngOnInit() {
    this.idProfesor = +this.route.snapshot.paramMap.get('id');

    if(this.idProfesor!=0){
      this.obtenerProfesor(this.idProfesor);
    }  
  }

  limpiar(limpiarExito: boolean) {
    this.agregarProfesorForm.reset();
    
    this.respuestaService = profesor;
    if (limpiarExito) {
      this.mensajeExito = undefined;
    }
    this.mensajeError = undefined;
  }

  agregarProfesor() {
    this.mensajeError = undefined;
    console.log(this.agregarProfesorForm.value);
    this.clienteService.postAny('/guardarProfesor', this.agregarProfesorForm.value).subscribe(
      (data: any[]) => {
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
      (data: any) => {
        console.log(data);

        this.agregarProfesorForm.setValue({       
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
