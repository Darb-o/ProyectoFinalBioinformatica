import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "app", 
    loadChildren: () => import('./aplicacion/aplicacion.module').then( m => m.AplicacionModule)
  },
  { 
    path: "**", redirectTo: "app"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
