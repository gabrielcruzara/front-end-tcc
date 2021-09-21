import { CredentialsService } from './../../../auth/credentials.service';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import * as AdminLte from 'admin-lte';
import $ from 'jquery';

import { AuthenticationService } from '@app/auth';

export interface IMenu {
  id: number;
  nome: string;
  url: string;
  mostrar: boolean;
  icone: string;
  submenus?: IMenu[];
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar: any;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();

  menus = [
    {
      id: 3,
      nome: 'Inicio',
      url: '/Inicio',
      mostrar: true,
      icone: 'nav-icon fas fa-users',
      submenus: [],
    },
    {
      id: 5,
      nome: 'Relatórios',
      url: '/relatorios',
      mostrar: true,
      icone: 'nav-icon fas fa-calendar-alt',
      submenus: [],
    },
    {
      id: 20,
      nome: 'Dashboard',
      url: '/dashboard',
      mostrar: true,
      icone: 'nav-icon fas fa-clinic-medical',
      submenus: [],
    },
  ];
  constructor(public authService: AuthenticationService, public credentialService: CredentialsService) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
    $('[data-widget="treeview"]').each(() => {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    });
  }
}