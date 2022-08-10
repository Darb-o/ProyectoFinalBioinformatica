import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {Message, PrimeNGConfig} from 'primeng/api';
@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styles: [
  ]
})
export class AlertaComponent implements OnInit, OnChanges {

  @Input() secuencia1! : string;
  @Output() retorno: EventEmitter<boolean> = new EventEmitter();
  bandera: boolean = false;
  msgs1!: Message[];
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.msgs1 = [
        {severity:'error', summary:'Error', detail:'La secuencia ingresada contiene caracteres no validos'}
    ];

    this.primengConfig.ripple = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const regex = /^[atcgATCG|<>#]*$/;
    if(regex.test(this.secuencia1)){
      this.bandera=false;
      this.retorno.emit(false);
    }else{
      this.bandera=true;
      this.retorno.emit(true);
    }
    
  }

}
