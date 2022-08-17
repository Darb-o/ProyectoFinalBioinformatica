import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Organismo, variablesNeedleman, vistaResultados } from '../../interfaces/organismo.interface';

interface resultadoNeedleman{
  secuenciaIngresada : string;
  secuenciaBase : string;
  puntuacion : number;
}

@Component({
  selector: 'app-needleman',
  templateUrl: './needleman.component.html',
  styles: [
  ]
})
export class NeedlemanComponent implements OnInit, OnChanges{

  @Input() secuenciaIngresada!: Organismo;
  @Input() organismoSeleccionado!: Organismo;
  @Input() secuenciasBase!: Organismo[];
  @Input() banderaComparacion!: boolean;
  @Input() contieneErrores!: boolean;
  @Input() valoresNeedleman!: variablesNeedleman;
  @Input() cambio!: boolean;
  arrayResultados: vistaResultados[] = [];
  secuenciaIngresadaModi: string = "";
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.alineamientoDinamico();
    console.log("cambie needleman");
  }

  ngOnInit(): void {
  }
  
  alineamientoDinamico(){
    if(this.contieneErrores){
      return;
    }
    if(this.secuenciaIngresada.secuencia.length<2){
      return;
    }
    if(!this.valoresNeedleman){
      return;
    }
    this.arrayResultados = [];
    let longitud:number = this.secuenciaIngresada.secuencia.length;
    let secuencia: string = this.secuenciaIngresada.secuencia;
    let longitudSeleccionado:number = 0;
    let secuenciaSeleccionado:string = "";
    let secuenciaResultado: string = "";
    let secuenciaResultadoIngresada : string = "";
    if( longitud > 60 ){
      secuencia = secuencia.slice(0,60);
      longitud = secuencia.length;
    }
    if(!this.banderaComparacion){
      if(this.organismoSeleccionado){
        longitudSeleccionado = this.organismoSeleccionado.secuencia.length;
        secuenciaSeleccionado = this.organismoSeleccionado.secuencia;
        if( longitudSeleccionado > 60 ){
          secuenciaSeleccionado = secuenciaSeleccionado.slice(0,60);
          longitudSeleccionado = secuenciaSeleccionado.length;
        }
        const objeto: resultadoNeedleman = this.lineamiento(secuencia,secuenciaSeleccionado);
        longitud = objeto.secuenciaIngresada.length;
        this.secuenciaIngresadaModi = objeto.secuenciaIngresada;
        longitudSeleccionado = objeto.secuenciaBase.length;
        secuencia = objeto.secuenciaIngresada;
        secuenciaSeleccionado = objeto.secuenciaBase;
        for( let i = 0; i < longitudSeleccionado ; i++ ){
          if(secuencia[i]===secuenciaSeleccionado[i]){
            secuenciaResultado+="|";
          }else{
            secuenciaResultado+=" ";
          }
        }
        this.arrayResultados.push({ cadena:secuenciaResultado
            , puntuacion: objeto.puntuacion
            , cadenaBase: objeto.secuenciaBase,
            cadenaIngresada: "" });
      }
    }else{
      for( let i = 0; i < this.secuenciasBase.length ; i++ ){
        secuenciaSeleccionado = this.secuenciasBase[i].secuencia;
        longitudSeleccionado = this.secuenciasBase[i].secuencia.length;
        if( longitudSeleccionado > 60 ){
          secuenciaSeleccionado = secuenciaSeleccionado.slice(0,60);
          longitudSeleccionado = secuenciaSeleccionado.length;
        }
        secuenciaResultado = "";
        const objeto: resultadoNeedleman = this.lineamiento(secuencia,secuenciaSeleccionado);
        longitud = objeto.secuenciaIngresada.length;
        secuenciaResultadoIngresada = objeto.secuenciaIngresada;
        longitudSeleccionado = objeto.secuenciaBase.length;
        secuenciaSeleccionado = objeto.secuenciaBase;
        for( let i = 0; i < longitudSeleccionado ; i++ ){
          if(secuenciaResultadoIngresada[i]===secuenciaSeleccionado[i]){
            secuenciaResultado+="|";
          }else{
            secuenciaResultado+=" ";
          }
        }
        this.arrayResultados.push({ cadena:secuenciaResultado
            , puntuacion: objeto.puntuacion
            , cadenaBase: objeto.secuenciaBase
            , cadenaIngresada: secuenciaResultadoIngresada });
      }
    }
  }

  lineamiento( secuenciaIngresada: string, secuenciaBase:string ) : resultadoNeedleman{
    secuenciaIngresada = "-" + secuenciaIngresada;
    secuenciaBase = "-" + secuenciaBase;
    let sec1: string[] = Array.from(secuenciaIngresada);
    let sec2: string[ ]= Array.from(secuenciaBase);
    const long1 = sec1.length;
    const long2 = sec2.length;
    let maximo;
    let matriz = new Array();
    let camino = [];
    let puntaje: number = 0;

    for( let i = 0; i < long1 ; i++ ){
      matriz[i] = new Array();
      for( let j = 0; j < long2 ; j++ ){
          if( i + j == i || i + j == j){
              matriz[i][j] = 0;
          }else{
              maximo = matriz[i-1][j-1];
              if(sec1[i] === sec2[j]){
                  maximo++;
              }
              if(matriz[i-1][j]>maximo){
                  maximo = matriz[i-1][j];
              }
              if(matriz[i][j-1]>maximo){
                  maximo = matriz[i][j-1];
              }
              matriz[i][j] = maximo;
          }
      }
    }
    let fila = long1-1;
    let columna = long2-1;
    camino.push([fila, columna]);
    let locales = [];
    let diagonales = 0;
    let final = columna;
    while( (fila-1) > 0 && (columna-1) > 0 ){
        maximo = [ fila - 1, columna - 1];
        if(matriz[fila-1][columna] > matriz[maximo[0]][maximo[1]]){
            maximo = [fila - 1,columna];
        }
        if(matriz[fila][columna-1] > matriz[maximo[0]][maximo[1]]){
            maximo = [fila,columna-1];
        }
        if(maximo[0] == fila-1 && maximo[1] == columna-1){
            diagonales++;
        }else{
            locales.push({inicio: columna, final: final, cantidad: diagonales});
            final = columna;
            diagonales = 0;
        }
        fila = maximo[0];
        columna = maximo[1];           
        camino.push(maximo);
    }
    console.log(locales);
    console.table(camino);

    console.log(sec1);
    console.log(sec2);
    let anterior = [camino[camino.length - 2][0],camino[camino.length - 2][1]];

    let salidasec1: string = "";
    let salidasec2: string = "";

    if( camino[camino.length - 1][0]>1 || camino[camino.length - 1][1]>1){
        if(camino[camino.length - 1][0] > camino[camino.length - 1][1] ){
            salidasec1=(sec1.slice(1,camino[camino.length - 1][0]+1)).toString();
            salidasec1=salidasec1.replace(/,/g, ""); 
            let resta = camino[camino.length - 1][0] - camino[camino.length - 1][1]
            salidasec2="-".repeat(resta) + sec2[1];
        }else{
            salidasec2=sec2.slice(1,camino[camino.length - 1][1]+1).toString();
            salidasec2=salidasec2.replace(/,/g, "");
            let resta = camino[camino.length - 1][1] - camino[camino.length - 1][0]
            salidasec1="-".repeat(resta) + sec1[1];
        }
    }else{
        salidasec1=(sec1.slice(1,2)).toString();
        salidasec2=(sec2.slice(1,2)).toString();
    }

    console.log(salidasec1);
    console.log(salidasec2);

    for( let i = camino.length - 2 ; i >= 0 ; i-- ){

        if(camino[i][0] == anterior[0]){
            salidasec1+="-";
            salidasec2+=(sec2.slice(camino[i][1],camino[i][1]+1)).toString();
            
        }else if(camino[i][1] == anterior[1]){
            salidasec1+=(sec1.slice(camino[i][0],camino[i][0]+1)).toString();
            
            salidasec2+="-";
        }else{
            salidasec1+=(sec1.slice(camino[i][0],camino[i][0]+1)).toString();
            salidasec2+=(sec2.slice(camino[i][1],camino[i][1]+1)).toString();
        }   
        
        anterior = [camino[i][0],camino[i][1]]
    
    }
    
    console.log("salida: "+salidasec1);
    console.log("salida: "+salidasec2);
    for( let i = 0; i < salidasec1.length; i++){
      if(!(salidasec1[i] == "-" && salidasec2[i] == "-")){
        if(salidasec1[i] == "-" || salidasec2[i] == "-"){ 
          puntaje+=this.valoresNeedleman.gap*(-1);
        }else if( salidasec1[i] === salidasec2[i] ){
          puntaje+=this.valoresNeedleman.coincidencia;
        }else if( salidasec1[i] != salidasec2[i]){
          puntaje+=this.valoresNeedleman.noCoincidencia;
        }
      }
    }
    console.log("Puntaje: "+puntaje);
    
    const resultado : resultadoNeedleman = {
      secuenciaIngresada: salidasec1 ,
      secuenciaBase: salidasec2 ,
      puntuacion: puntaje
    }

    return resultado;
  }

}
