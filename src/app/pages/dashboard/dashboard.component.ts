import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { AccesoService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { calendar } from '../../../assets/javascript/date'

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  titulo:any='Consulta de citas odontológicas';
  turnos:any;
  empleados:any;
  id_empleado:any='0';
  dropdown:any='Odontólogo';
  fecha:any='';
  fecha_dia:any;
  cedula:any='';
  cedula1:any='';
  cedula2:any='';
  cedula3:any='';
  cedula4:any='';
  cedula5:any='';
  cedula6:any='';
  cedula7:any='';
  cedula8:any='';
  cedula9:any='';
  cedula10:any='';
  nombre:any='';
  nombre1:any='';
  nombre2:any='';
  nombre3:any='';
  nombre4:any='';
  nombre5:any='';
  nombre6:any='';
  nombre7:any='';
  nombre8:any='';
  nombre9:any='';
  nombre10:any='';
  apellido:any='';
  apellido1:any='';
  apellido2:any='';
  apellido3:any='';
  apellido4:any='';
  apellido5:any='';
  apellido6:any='';
  apellido7:any='';
  apellido8:any='';
  apellido9:any='';
  apellido10:any='';
  estado:any='';
  estado1:any='';
  estado2:any='';
  estado3:any='';
  estado4:any='';
  estado5:any='';
  estado6:any='';
  estado7:any='';
  estado8:any='';
  estado9:any='';
  estado10:any='';
  hora:any='';
  hora1:any='8:00-8:45';
  hora2:any='9:00-9:45';
  hora3:any='10:00-10:45';
  hora4:any='11:00-11:45';
  hora5:any='12:00-12:45';
  hora6:any='14:00-14:45';
  hora7:any='15:00-15:45';
  hora8:any='16:00-16:45';
  hora9:any='17:00-17:45';
  hora10:any='18:00-18:45';
  id_paciente:any='';
  id_paciente1:any='';
  id_paciente2:any='';
  id_paciente3:any='';
  id_paciente4:any='';
  id_paciente5:any='';
  id_paciente6:any='';
  id_paciente7:any='';
  id_paciente8:any='';
  id_paciente9:any='';
  id_paciente10:any='';
  numero:any='';
  bandera:any;
  stateE = false
  stateN = false;
  stateH = false;
  stateC = false;
  stateS = false;
  dias:any;
  currentHour:any;
  currentMinute:any;
  hoy:any;
  ho1:any=800
  ho2:any=900
  ho3:any=1000
  ho4:any=1100
  ho5:any=1200
  ho6:any=1400
  ho7:any=1500
  ho8:any=1600
  ho9:any=1700
  ho10:any=1800

  constructor(private servicio: AccesoService,
    private router: Router) { }

  ngOnInit() {
    this.fechajs()
    this.consultaDiaria()
    this.dropdown='Odontólogo'
    document.getElementById('pdf1').style.display = 'none';
    document.getElementById('tabla2').style.display = 'none';
    document.getElementById('pdf2').style.display = 'none';
    document.getElementById('btn1').setAttribute('disabled', 'disabled');

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});

  }

  pdf1(){
    document.getElementById('pdf1').style.display = 'block';
    let DATA: any = document.getElementById('pdf1');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = canvas.width;
      let fileHeight = canvas.height;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
      let position = 5;
      PDF.addImage(FILEURI, 'JPEG', 5, position, fileWidth, fileHeight);
      PDF.save(this.fecha+'_'+this.dropdown+'.pdf');
    });
      document.getElementById('pdf1').style.display = 'none';
      document.getElementById('rep').style.display = 'block';
      document.getElementById('rep1').style.display = 'block';
      document.getElementById('rep2').style.display = 'block';
      document.getElementById('rep3').style.display = 'block';
      document.getElementById('rep4').style.display = 'block';
      document.getElementById('rep5').style.display = 'block';
      document.getElementById('rep6').style.display = 'block';
      document.getElementById('rep7').style.display = 'block';
      document.getElementById('rep8').style.display = 'block';
      document.getElementById('rep9').style.display = 'block';
      document.getElementById('rep10').style.display = 'block';
  }

  pdf2(){
    this.consultaDiaria();
    document.getElementById('pdf2').style.display = 'block';
    let DATA: any = document.getElementById('pdf2');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = canvas.width;
      let fileHeight = canvas.height;
      const FILEURI = canvas.toDataURL('image/jpg');
      let PDF = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
      let position = 5;
      PDF.addImage(FILEURI, 'JPEG', 5, position, fileWidth, fileHeight);
      PDF.save('citas_del_dia.pdf');
    });
      document.getElementById('pdf2').style.display = 'none';
  }

  fechajs(){
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth()+1; // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    if(currentMinute<10){
      this.currentMinute='0'+currentMinute
    }else{
      this.currentMinute=currentMinute
    }
    this.currentHour=currentHour+''+this.currentMinute
    let mes
    if(currentMonth<10){
      mes ='0'+currentMonth
    }else{
      mes =currentMonth
    }
    let dia
    if(currentDayOfMonth<10){
      dia ='0'+currentDayOfMonth
    }else{
      dia =currentDayOfMonth
    }
    this.hoy = currentYear + "-" + mes + "-" + dia;
    console.log(this.hoy);
    console.log(this.currentHour)
  }

  consultaDiaria(){
      let body={
        'accion': 'consultaDiaria',
        'fecha': this.hoy
      }
      return new Promise(resolve=>{
        this.servicio.postData(body).subscribe((res:any)=>{
          if(res.estado){
            this.dias=res.datos;
          }else{

          }
        });
      });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  reporte1(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }else{
      document.getElementById('rep').style.display = 'none';
      document.getElementById('rep1').style.display = 'none';
      document.getElementById('rep2').style.display = 'none';
      document.getElementById('rep3').style.display = 'none';
      document.getElementById('rep4').style.display = 'none';
      document.getElementById('rep5').style.display = 'none';
      document.getElementById('rep6').style.display = 'none';
      document.getElementById('rep7').style.display = 'none';
      document.getElementById('rep8').style.display = 'none';
      document.getElementById('rep9').style.display = 'none';
      document.getElementById('rep10').style.display = 'none';
      this.pdf1()
    }
  }

  consultarTurnos1(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }else{
      let body={
        'accion': 'consultar_turnos_secretaria',
        'id_empleado': this.id_empleado,
        'fecha': this.fecha,
        'numero': '1'
      }
      return new Promise(resolve=>{
        this.servicio.postData(body).subscribe((res:any)=>{
          if(res.estado){
            let turno=res.datos;
            this.nombre1=turno[0].p_nombre;
            this.apellido1=turno[0].p_apellido;
            this.cedula1=turno[0].cedula;
            this.estado1=turno[0].estado;
            this.id_paciente1=turno[0].id_paciente;
            this.consultarTurnos2();
          }else{
            this.nombre1='Disponible'
            this.apellido1='Disponible'
            this.cedula1='Disponible'
            this.estado1='Disponible'
            this.consultarTurnos2();
          }
        });
      });
    }
  }

  consultarTurnos2(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '2'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre2=turno[0].p_nombre;
          this.apellido2=turno[0].p_apellido;
          this.cedula2=turno[0].cedula;
          this.estado2=turno[0].estado;
          this.id_paciente2=turno[0].id_paciente;
          this.consultarTurnos3();
        }else{
          this.nombre2='Disponible'
          this.apellido2='Disponible'
          this.cedula2='Disponible'
          this.estado2='Disponible'
          this.consultarTurnos3();
        }
      });
    });
  }

  consultarTurnos3(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '3'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre3=turno[0].p_nombre;
          this.apellido3=turno[0].p_apellido;
          this.cedula3=turno[0].cedula;
          this.estado3=turno[0].estado;
          this.id_paciente3=turno[0].id_paciente;
          this.consultarTurnos4();
        }else{
          this.nombre3='Disponible'
          this.apellido3='Disponible'
          this.cedula3='Disponible'
          this.estado3='Disponible'
          this.consultarTurnos4();
        }
      });
    });
  }

  consultarTurnos4(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '4'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre4=turno[0].p_nombre;
          this.apellido4=turno[0].p_apellido;
          this.cedula4=turno[0].cedula;
          this.estado4=turno[0].estado;
          this.id_paciente4=turno[0].id_paciente;
          this.consultarTurnos5();
        }else{
          this.nombre4='Disponible'
          this.apellido4='Disponible'
          this.cedula4='Disponible'
          this.estado4='Disponible'
          this.consultarTurnos5();
        }
      });
    });
  }

  consultarTurnos5(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '5'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre5=turno[0].p_nombre;
          this.apellido5=turno[0].p_apellido;
          this.cedula5=turno[0].cedula;
          this.estado5=turno[0].estado;
          this.id_paciente5=turno[0].id_paciente;
          this.consultarTurnos6();
        }else{
          this.nombre5='Disponible'
          this.apellido5='Disponible'
          this.cedula5='Disponible'
          this.estado5='Disponible'
          this.consultarTurnos6();
        }
      });
    });
  }

  consultarTurnos6(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '6'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre6=turno[0].p_nombre;
          this.apellido6=turno[0].p_apellido;
          this.cedula6=turno[0].cedula;
          this.estado6=turno[0].estado;
          this.id_paciente6=turno[0].id_paciente;
          this.consultarTurnos7();
        }else{
          this.nombre6='Disponible'
          this.apellido6='Disponible'
          this.cedula6='Disponible'
          this.estado6='Disponible'
          this.consultarTurnos7();
        }
      });
    });
  }

  consultarTurnos7(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '7'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre7=turno[0].p_nombre;
          this.apellido7=turno[0].p_apellido;
          this.cedula7=turno[0].cedula;
          this.estado7=turno[0].estado;
          this.id_paciente7=turno[0].id_paciente;
          this.consultarTurnos8();
        }else{
          this.nombre7='Disponible'
          this.apellido7='Disponible'
          this.cedula7='Disponible'
          this.estado7='Disponible'
          this.consultarTurnos8();
        }
      });
    });
  }

  consultarTurnos8(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '8'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre8=turno[0].p_nombre;
          this.apellido8=turno[0].p_apellido;
          this.cedula8=turno[0].cedula;
          this.estado8=turno[0].estado;
          this.id_paciente8=turno[0].id_paciente;
          this.consultarTurnos9();
        }else{
          this.nombre8='Disponible'
          this.apellido8='Disponible'
          this.cedula8='Disponible'
          this.estado8='Disponible'
          this.consultarTurnos9();
        }
      });
    });
  }

  consultarTurnos9(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '9'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre9=turno[0].p_nombre;
          this.apellido9=turno[0].p_apellido;
          this.cedula9=turno[0].cedula;
          this.estado9=turno[0].estado;
          this.id_paciente9=turno[0].id_paciente;
          this.consultarTurnos10();
        }else{
          this.nombre9='Disponible'
          this.apellido9='Disponible'
          this.cedula9='Disponible'
          this.estado9='Disponible'
          this.consultarTurnos10();
        }
      });
    });
  }

  consultarTurnos10(){
    if(this.id_empleado=='0'){
      Swal.fire('Seleccione un odontólogo','','warning')
    }else if(this.fecha==''){
      Swal.fire('Seleccione una fecha','','warning')
    }
    let body={
      'accion': 'consultar_turnos_secretaria',
      'id_empleado': this.id_empleado,
      'fecha': this.fecha,
      'numero': '10'
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let turno=res.datos;
          this.nombre10=turno[0].p_nombre;
          this.apellido10=turno[0].p_apellido;
          this.cedula10=turno[0].cedula;
          this.estado10=turno[0].estado;
          this.id_paciente10=turno[0].id_paciente;
          (<HTMLInputElement> document.getElementById("btn1")).disabled = false;
        }else{
          this.nombre10='Disponible'
          this.apellido10='Disponible'
          this.cedula10='Disponible'
          this.estado10='Disponible';
          (<HTMLInputElement> document.getElementById("btn1")).disabled = false;
        }
      });
    });
  }

  consultarEmpleados(){
    let body={
      'accion': 'consultar_medicos'
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
    this.id_empleado=empleado.id_empleado;
    this.dropdown=empleado.nombre+' '+empleado.apellido
  }

  regresar(){
    document.getElementById('tabla2').style.display = 'none';
    document.getElementById('tabla').style.display = 'block';
    this.titulo='Consulta de citas odontológicas'
    this.consultarTurnos1();
  }

  editar1(){
    if(this.nombre1==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre1=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho1<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=1;
          this.hora=this.hora1;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=1;
        this.hora=this.hora1;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=1;
      this.hora=this.hora1;
      this.nombre=this.nombre1;
      this.apellido=this.apellido1;
      this.cedula=this.cedula1;
      this.estado=this.estado1;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar2(){
    if(this.nombre2==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre2=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho2<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=2;
          this.hora=this.hora2;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=2;
        this.hora=this.hora2;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=2;
      this.hora=this.hora2;
      this.nombre=this.nombre2;
      this.apellido=this.apellido2;
      this.cedula=this.cedula2;
      this.estado=this.estado2;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar3(){
    if(this.nombre3==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre3=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho3<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=3;
          this.hora=this.hora3;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=3;
        this.hora=this.hora3;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=3;
      this.hora=this.hora3;
      this.nombre=this.nombre3;
      this.apellido=this.apellido3;
      this.cedula=this.cedula3;
      this.estado=this.estado3;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar4(){
    if(this.nombre4==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre4=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho4<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=4;
          this.hora=this.hora4;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=4;
        this.hora=this.hora4;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=4;
      this.hora=this.hora4;
      this.nombre=this.nombre4;
      this.apellido=this.apellido4;
      this.cedula=this.cedula4;
      this.estado=this.estado4;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar5(){
    if(this.nombre5==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre5=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho5<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=5;
          this.hora=this.hora5;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=5;
        this.hora=this.hora5;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=5;
      this.hora=this.hora5;
      this.nombre=this.nombre5;
      this.apellido=this.apellido5;
      this.cedula=this.cedula5;
      this.estado=this.estado5;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar6(){
    if(this.nombre6==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre6=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho6<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=6;
          this.hora=this.hora6;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=6;
        this.hora=this.hora6;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=6;
      this.hora=this.hora6;
      this.nombre=this.nombre6;
      this.apellido=this.apellido6;
      this.cedula=this.cedula6;
      this.estado=this.estado6;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar7(){
    if(this.nombre7==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre7=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho7<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=7;
          this.hora=this.hora7;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=7;
        this.hora=this.hora7;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=7;
      this.hora=this.hora7;
      this.nombre=this.nombre7;
      this.apellido=this.apellido7;
      this.cedula=this.cedula7;
      this.estado=this.estado7;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar8(){
    if(this.nombre8==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre8=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho8<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=8;
          this.hora=this.hora8;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=8;
        this.hora=this.hora8;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=8;
      this.hora=this.hora8;
      this.nombre=this.nombre8;
      this.apellido=this.apellido8;
      this.cedula=this.cedula8;
      this.estado=this.estado8;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar9(){
    if(this.nombre9==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre9=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho9<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=9;
          this.hora=this.hora9;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=9;
        this.hora=this.hora9;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=9;
      this.hora=this.hora9;
      this.nombre=this.nombre9;
      this.apellido=this.apellido9;
      this.cedula=this.cedula9;
      this.estado=this.estado9;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  editar10(){
    if(this.nombre10==''){
      Swal.fire('Seleccione un odontólogo y una fecha','','warning')
    }else if(this.nombre10=='Disponible'){
      if(this.hoy==this.fecha){
        if(this.ho10<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          this.bandera='1'
          document.getElementById('tabla2').style.display = 'block';
          document.getElementById('tabla').style.display = 'none';
          document.getElementById('buscador').style.display = 'block';
          document.getElementById('cedula').style.display = 'none';
          this.titulo='Agendamiento de citas'
          this.numero=10;
          this.hora=this.hora10;
          this.nombre='';
          this.apellido='';
          this.cedula='';
          this.estado='No disponible';
          this.stateE=true;
          this.stateH=true
          this.stateC=false
          this.stateN=true
          this.stateS=true
        }
      }else{
        this.bandera='1'
        document.getElementById('tabla2').style.display = 'block';
        document.getElementById('tabla').style.display = 'none';
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('cedula').style.display = 'none';
        this.titulo='Agendamiento de citas'
        this.numero=10;
        this.hora=this.hora10;
        this.nombre='';
        this.apellido='';
        this.cedula='';
        this.estado='No disponible';
        this.stateE=true;
        this.stateH=true
        this.stateC=false
        this.stateN=true
        this.stateS=true
      }
    }else{
      this.bandera='2'
      document.getElementById('tabla2').style.display = 'block';
      document.getElementById('tabla').style.display = 'none';
      document.getElementById('buscador').style.display = 'none';
      document.getElementById('cedula').style.display = 'block';
      this.titulo='Cambio del estado de la cita'
      this.numero=10;
      this.hora=this.hora10;
      this.nombre=this.nombre10;
      this.apellido=this.apellido10;
      this.cedula=this.cedula10;
      this.estado=this.estado10;
      this.stateE=false
      this.stateH=true
      this.stateC=true
      this.stateN=true
      this.stateS=true
    }
  }

  buscador(){
    let body={
      'accion': 'consulta_pacientes_cedula',
      'cedula': '%'+this.cedula+'%'
    }
    console.log(body)
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          let paciente=res.datos;
          this.nombre=paciente[0].p_nombre;
          this.apellido=paciente[0].p_apellido;
          this.id_paciente=paciente[0].id_paciente;
        }else{
          Swal.fire('No existe esa cédula','','warning')
          this.nombre=''
          this.apellido=''
          this.id_paciente=''
        }
      });
    });
  }

  guardar(){
    if(this.bandera=='1'){
      if(this.cedula==''){
        Swal.fire('Ingrese una cédula','','warning');
      }else{
        console.log('guardando')
        let body={
          'accion': 'crear_turno',
          'numero': this.numero,
          'fecha' : this.fecha,
          'estado': this.estado,
          'hora': this.hora,
          'empleados_id_empleado': this.id_empleado,
          'pacientes_id_paciente': this.id_paciente
        }
        return new Promise(resolve=>{
          this.servicio.postData(body).subscribe((res:any)=>{
            if(res.estado){
              let turnos=res.datos;
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
    }else if(this.bandera=='2'){
      if(this.estado==''){
        Swal.fire('Ingrese un estado','','warning');
      }else{
        console.log('actualizando')
      let body={
        'accion': 'actualizar_turnos',
        'estado': this.estado,
        'fecha' : this.fecha,
        'numero': this.numero
      }
      return new Promise(resolve=>{
        this.servicio.postData(body).subscribe((res:any)=>{
          if(res.estado){
            let turnos=res.datos;
            Swal.fire('Actualizado con éxito','', 'success');
            this.regresar();
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

  state(estado){
    this.estado=estado
  }

  public validador;
    validadorDeCedula(cedula: String) {
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

    calendar(){
      calendar()
      this.fecha=''
    }
}
