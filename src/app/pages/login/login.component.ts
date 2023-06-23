import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccesoService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  usuario: any;
  nombre: any;
  mensajes:any;
  clave: string='';
  cedula: string='';

  constructor(private servicio: AccesoService,
    private router: Router) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  verificar(){
    if(this.cedula==''){
      Swal.fire('Error','Ingrese la cédula','error');
    }else if(this.clave==''){
      Swal.fire('Error','Ingrese la clave','error');
    }else{
      let body={
        'accion': 'login_secretaria',
        'cedula': this.cedula,
        'clave' : this.clave
      }
      return new Promise(resolve=>{
        this.servicio.postData(body).subscribe((res:any)=>{
          if(res.estado){
            this.usuario=res.datos;
            this.servicio.usuarioId=this.usuario[0].id_empleado;
            this.servicio.cedulaSesion=this.usuario[0].cedula;
            localStorage.setItem('id', this.usuario[0].id_empleado);
            localStorage.setItem('cargo', this.usuario[0].cargo);
            this.nombre=this.usuario[0].nombre +' '+ this.usuario[0].apellido;
            this.servicio.nombreSesion=this.nombre;
            localStorage.setItem('nombre', this.nombre);
            this.servicio.claveSesion=this.clave;
            Swal.fire('Bienvenido','' +this.nombre+ '', 'success');
            this.router.navigateByUrl("dashboard")
          }else{
            Swal.fire('Error','Datos incorrectos','error');
          }
        },(err)=>{
          Swal.fire('Error','Error de conexión','error');
          console.log('Error de conexión, login');
        });
      });
    }
  }

}
