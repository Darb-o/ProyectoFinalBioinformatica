import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styles: [
  ]
})
export class AppmenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[] = [];

  ngOnInit() {
      this.items = [
          { label: 'Consultas', icon: 'pi pi-search', routerLink: './app/consulta'},
          { label: 'Alineamiento', icon: 'pi pi-sitemap',  routerLink: './app/alineamiento'}
      ];
  }

}
