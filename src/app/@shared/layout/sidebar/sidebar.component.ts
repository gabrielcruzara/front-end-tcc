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
      id: 1,
      nome: 'Inicio',
      url: '/Inicio',
      mostrar: true,
      icone: 'nav-icon fas fa-home',
      submenus: [],
    },
    {
      id: 2,
      nome: 'Serviços',
      url: '/servicos',
      mostrar: true,
      icone: 'nav-icon fas fa-tools',
      submenus: [
        {
          id: 20,
          nome: 'Cadastro',
          url: '/servicos/cadastro',
          mostrar: true,
          icone: 'nav-icon fas fa-money-check-alt',
        },
        {
          id: 21,
          nome: 'Meus Serviços',
          url: '/servicos/meus-servicos',
          mostrar: true,
          icone: 'nav-icon fas fa-money-check-alt',
        },

      ],
    },
    {
      id: 3,
      nome: 'Relatórios',
      url: '/relatorios',
      mostrar: true,
      icone: 'nav-icon fas fa-calendar-alt',
      submenus: [],
    },
    {
      id: 4,
      nome: 'Dashboard',
      url: '/dashboard',
      mostrar: true,
      icone: 'nav-icon fas fa-chart-line',
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
