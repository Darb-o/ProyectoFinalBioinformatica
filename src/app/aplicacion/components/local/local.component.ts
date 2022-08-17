import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Organismo, vistaResultados } from '../../interfaces/organismo.interface';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styles: []
})
export class LocalComponent implements OnInit, OnChanges{

  @Input() secuenciaIngresada!: Organismo;
  @Input() organismoSeleccionado!: Organismo;
  @Input() secuenciasBase!: Organismo[];
  @Input() banderaComparacion!: boolean;
  @Input() contieneErrores!: boolean;
  @Input() rangoValoresBase!: number[];
  @Input() rangoValoresIngresada!: number[];
  arrayResultados: vistaResultados[] = [];
  secuenciaIngresadaModi: string = "";

  constructor( ) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.alineamientoLocal();
  }

  ngOnInit(): void {
  }

  
  alineamientoLocal(){
    if(this.contieneErrores){
      return;
    }
    if(!this.secuenciaIngresada){
      return;
    }
    this.arrayResultados = [];
    let longitud:number = this.rangoValoresIngresada[1] - this.rangoValoresIngresada[0];
    let secuencia: string = this.secuenciaIngresada.secuencia.slice(this.rangoValoresIngresada[0],this.rangoValoresIngresada[1]);
    let longitudSeleccionado:number = 0;
    let secuenciaSeleccionado:string = "";
    let secuenciaResultado: string = "";
    let puntuacion: number = 0;
    let porcentaje: number = -1;
    if( longitud > 60 ){
      secuencia = secuencia.slice(0,60);
      longitud = secuencia.length;
    }
    this.secuenciaIngresadaModi = secuencia;
    let menor = longitud;
    if(!this.banderaComparacion){
      if(this.organismoSeleccionado){
        longitudSeleccionado = this.rangoValoresBase[1] - this.rangoValoresBase[0];
        secuenciaSeleccionado = this.organismoSeleccionado.secuencia.slice(this.rangoValoresBase[0],this.rangoValoresBase[1]);
        if( longitudSeleccionado > 60 ){
          secuenciaSeleccionado = secuenciaSeleccionado.slice(0,60);
          longitudSeleccionado = secuenciaSeleccionado.length;
        }
        if(longitudSeleccionado<longitud){
          menor = longitudSeleccionado;
        }
        for( let i = 0; i < menor ; i++ ){
          if(secuencia[i]===secuenciaSeleccionado[i]){
            secuenciaResultado+="|";
            puntuacion++;
          }else{
            secuenciaResultado+=" ";
          }
        }
        if(secuenciaResultado.length<longitudSeleccionado){
          let valor = longitudSeleccionado-secuenciaResultado.length;
          secuenciaResultado+=" ".repeat(valor);
        }
        if(longitudSeleccionado===longitud){
          porcentaje = (puntuacion * 100)/longitud;
        }
        let objeto: vistaResultados;
        if (porcentaje>=0) {
          objeto = {
            cadena:secuenciaResultado,
            puntuacion,
            porcentaje,
            cadenaBase: secuenciaSeleccionado,
            cadenaIngresada: ""
          }   
        }else{
          objeto = {
            cadena:secuenciaResultado,
            puntuacion,
            cadenaBase: secuenciaSeleccionado,
            cadenaIngresada: ""
          }
        }
        this.arrayResultados.push(objeto);
      }
    }else{
      for( let i = 0; i < this.secuenciasBase.length ; i++ ){
        longitudSeleccionado = this.rangoValoresBase[1] - this.rangoValoresBase[0];
        secuenciaSeleccionado = this.secuenciasBase[i].secuencia.slice(this.rangoValoresBase[0],this.rangoValoresBase[1]);
        if( longitudSeleccionado > 60 ){
          secuenciaSeleccionado = secuenciaSeleccionado.slice(0,60);
          longitudSeleccionado = secuenciaSeleccionado.length;
        }
        secuenciaResultado = "";
        puntuacion = 0;
        porcentaje = -1;
        menor = (longitud<=longitudSeleccionado)
          ? longitud
          : longitudSeleccionado
        for(let j = 0; j < menor ; j++){
          if(secuencia[j]===secuenciaSeleccionado[j]){
            secuenciaResultado+="|";
            puntuacion++;
          }else{
            secuenciaResultado+=" ";
          }
        }
        if(secuenciaResultado.length<longitudSeleccionado){
          let valor = longitudSeleccionado-secuenciaResultado.length;
          secuenciaResultado+=" ".repeat(valor);
        }
        if(longitudSeleccionado===longitud){
          porcentaje = (puntuacion * 100)/longitud;
        }
        let objeto: vistaResultados;
        if (porcentaje>=0) {
          objeto = {
            cadena:secuenciaResultado,
            puntuacion,
            porcentaje,
            cadenaBase: secuenciaSeleccionado,
            cadenaIngresada: ""
          }   
        }else{
          objeto = {
            cadena:secuenciaResultado,
            puntuacion,
            cadenaBase: secuenciaSeleccionado,
            cadenaIngresada: ""
          }
        }
        this.arrayResultados.push(objeto);
      }
    }
  }


}
