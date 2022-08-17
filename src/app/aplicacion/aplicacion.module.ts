import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AplicacionRoutingModule } from './aplicacion-routing.module';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { AlineamientoComponent } from './pages/alineamiento/alineamiento.component';

import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CardViewComponent } from './components/card-view/card-view.component';
import { LocalComponent } from './components/local/local.component';
import { GlobalComponent } from './components/global/global.component';
import { NeedlemanComponent } from './components/needleman/needleman.component';
import { DotplotComponent } from './components/dotplot/dotplot.component';
import { VistaAlineamientosComponent } from './components/vista-alineamientos/vista-alineamientos.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ConsultaComponent,
    AlineamientoComponent,
    CardViewComponent,
    LocalComponent,
    GlobalComponent,
    NeedlemanComponent,
    DotplotComponent,
    VistaAlineamientosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AplicacionRoutingModule,
    PrimeNgModule,
    NgChartsModule
  ]
})
export class AplicacionModule { }
