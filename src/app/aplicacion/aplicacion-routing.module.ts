import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlineamientoComponent } from './pages/alineamiento/alineamiento.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';

const routes: Routes = [
  { 
    path: "",
    children: [
      { path: "consulta", component: ConsultaComponent },
      { path: "alineamiento", component: AlineamientoComponent },
      { path: "**", redirectTo: "consulta" }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacionRoutingModule { }
