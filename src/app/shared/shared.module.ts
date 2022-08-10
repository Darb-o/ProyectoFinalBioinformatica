import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppmenuComponent } from './appmenu/appmenu.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    AppmenuComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    AppmenuComponent
  ]
})
export class SharedModule { }
