import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AplicacionRoutingModule } from './aplicacion-routing.module';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { AlineamientoComponent } from './pages/alineamiento/alineamiento.component';

import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AlertaComponent } from './components/alerta/alerta.component';


@NgModule({
  declarations: [
    ConsultaComponent,
    AlineamientoComponent,
    AlertaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AplicacionRoutingModule,
    PrimeNgModule
  ]
})
export class AplicacionModule { }
