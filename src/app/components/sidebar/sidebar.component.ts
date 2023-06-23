import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon:'ni-bullet-list-67 text-primary', class: '' },
    { path: '/icons', title: 'Pacientes',  icon:'fa fa-user text-blue', class: '' },
    { path: '/tables', title: 'Empleados',  icon:'ni-badge text-blue', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  inicio(){
    this.router.navigateByUrl("dashboard")
  }

}
