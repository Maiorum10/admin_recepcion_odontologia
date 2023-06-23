import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccesoService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy {

  selectedRow:number=0;
  empleados:any;
  btn1:any='Editar';
  btn2:any='Guardar'
  id_empleado:any;
  nombre:any='';
  apellido:any='';
  cedula:any='';
  cedula2:any='';
  celular:any='';
  cargo:any='';
  titulo:any='Lista de empleados'
  bandera:any;

  constructor(private servicio: AccesoService,
    private router: Router) { }

  ngOnDestroy() {
    document.getElementById('tabla2').style.display = 'none';
    document.getElementById('boton2').style.display = 'none';
  }

  ngOnInit() {
    if(localStorage.getItem('id')=='0'||localStorage.getItem('id')==null){
      Swal.fire('Inicie sesión por favor','', 'warning');
      this.router.navigateByUrl("login")
    }else if(localStorage.getItem('cargo')!='Admin'){
      Swal.fire('Pestaña administrativa','','warning')
      this.router.navigateByUrl("dashboard")
    }
    this.consultarEmpleados();
    document.getElementById('tabla2').style.display = 'none';
    document.getElementById('boton2').style.display = 'none';
  }

  consultarEmpleados(){
    let body={
      'accion': 'consultar_empleados_tabla'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          this.empleados=res.datos;
        }else{

        }
      });
    });
  }

  remove(empleado){
    document.getElementById('cedula').setAttribute("disabled","disabled")
    this.validador=true
    this.selectedRow = empleado.id_empleado;
    this.id_empleado=empleado.id_empleado;
    this.nombre=empleado.nombre;
    this.apellido=empleado.apellido;
    this.cedula=empleado.cedula;
    this.celular=empleado.celular;
    this.cargo=empleado.cargo;
    this.bandera=1
  }

  nuevo(){
    document.getElementById('cedula').removeAttribute("disabled")
    this.id_empleado=0
    this.nombre=''
    this.apellido=''
    this.cedula=''
    this.celular=''
    this.cargo='Seleccione'
    this.bandera=2
  }

  regresar(){
    document.getElementById('tabla').style.display = 'block';
    document.getElementById('tabla2').style.display = 'none';
    document.getElementById('boton1').style.display = 'block';
    document.getElementById('boton2').style.display = 'none';
    document.getElementById('buscador').style.display = 'block';
    //this.titulo='Lista de empleados'
    this.consultarEmpleados();
  }

  guardar(){
    if(this.validador==true){
      if(this.nombre==''){
        Swal.fire('Ingrese un nombre','', 'warning');
      }else if(this.apellido==''){
        Swal.fire('Ingrese un apellido','', 'warning');
      }else if(this.cedula==''){
        Swal.fire('Ingrese una cedula','', 'warning');
      }else if(this.celular==''){
        Swal.fire('Ingrese un celular','', 'warning');
      }else if(this.cargo==''){
        Swal.fire('Ingrese un cargo','', 'warning');
      }else if(this.cargo=='Seleccione'){
        Swal.fire('Ingrese un cargo','', 'warning');
      }else{
        if(this.bandera==1){
          let body={
            'accion': 'actualizar_empleados',
            'nombre': this.nombre,
            'apellido' : this.apellido,
            'cedula': this.cedula,
            'celular': this.celular,
            'cargo': this.cargo,
            'id_empleado': this.id_empleado
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                let usuario=res.datos;
                Swal.fire('Actualizado con éxito','', 'success');
                this.regresar();
              }else{
                Swal.fire('Error','Datos incorrectos','error');
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }else if(this.bandera==2){
          let body={
            'accion': 'consulta_empleados_cedula',
            'cedula': this.cedula
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                let usuario=res.datos;
                Swal.fire('Empleado ya registrado','', 'warning');
              }else{
                let body={
                  'accion': 'crear_empleados',
                  'nombre': this.nombre,
                  'apellido' : this.apellido,
                  'cedula': this.cedula,
                  'celular': this.celular,
                  'cargo': this.cargo
                }
                return new Promise(resolve=>{
                  this.servicio.postData(body).subscribe((res:any)=>{
                    if(res.estado){
                      let usuario=res.datos;
                      Swal.fire('Creado con éxito','', 'success');
                      this.regresar();
                    }else{
                      Swal.fire('Error','Datos incorrectos','error');
                    }
                  },(err)=>{
                    Swal.fire('Error','Error de conexión','error');
                  });
                });
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión 1','error');
            });
          });

        }
      }
    }else{
      Swal.fire('Ingrese una cédula válida','','warning')
    }
  }

  empleado(cargo){
    this.cargo=cargo
  }

  public validador;
    validadorDeCedula(cedula: String) {
      if(this.cedula=='0000000000'||this.cedula=='2222222222'||this.cedula=='4444444444'||this.cedula=='5555555555'){
        Swal.fire('Cédula inválida','','warning')
        this.cedula=''
      }else{
        let cedulaCorrecta = false;
        if (cedula.length == 10)
        {
          let tercerDigito = parseInt(cedula.substring(2, 3));
          if (tercerDigito < 6) {
              // El ultimo digito se lo considera dígito verificador
              let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
              let verificador = parseInt(cedula.substring(9, 10));
              let suma:number = 0;
              let digito:number = 0;
              for (let i = 0; i < (cedula.length - 1); i++) {
                  digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
                  suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
            //      console.log(suma+" suma"+coefValCedula[i]);
              }
              suma= Math.round(suma);
            //  console.log(verificador);
            //  console.log(suma);
            //  console.log(digito);
              if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                  cedulaCorrecta = true;
              } else if ((10 - (Math.round(suma % 10))) == verificador) {
                  cedulaCorrecta = true;
              } else {
                  cedulaCorrecta = false;
                  Swal.fire('Cédula inválida','','warning')
                  this.cedula=''
              }
            } else {
              cedulaCorrecta = false;
              Swal.fire('Cédula inválida','','warning')
              this.cedula=''
            }
        } else {
              cedulaCorrecta = false;
              Swal.fire('Cédula inválida','','warning')
              this.cedula=''
        }
        this.validador= cedulaCorrecta;
      }
    }

    buscador(){
      let body={
        'accion': 'consulta_empleados_cedula',
        'cedula': '%'+this.cedula2+'%'
      }
      return new Promise(resolve=>{
        this.servicio.postData(body).subscribe((res:any)=>{
          if(res.estado){
            this.empleados=res.datos;
          }else{

          }
        });
      });
    }

}

