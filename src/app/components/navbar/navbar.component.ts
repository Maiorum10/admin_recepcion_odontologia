import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AccesoService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  nombre:any;

  constructor(location: Location,  private element: ElementRef, private servicio: AccesoService,
    private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.nombre=localStorage.getItem('nombre')
    console.log(localStorage.getItem('id'))
    if(localStorage.getItem('id')=='0'||localStorage.getItem('id')==null){
      Swal.fire('Inicie sesión por favor','', 'warning');
      this.router.navigateByUrl("login")
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  salir(){
    localStorage.setItem('id', '0')
    Swal.fire('Sesión finalizada','', 'success');
    this.router.navigateByUrl("login")
  }

}
