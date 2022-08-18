import { Component, } from '@angular/core';

import { Message } from 'primeng/api';

import { Organismo, tipo, variablesNeedleman } from '../../interfaces/organismo.interface';
import { ListadoService } from '../../services/listado.service';


@Component({
  selector: 'app-alineamiento',
  templateUrl: './alineamiento.component.html',
  styles: [
  ]
})
export class AlineamientoComponent {

  //Array de organismos de la base
  organismos: Organismo[] = [];
  //Organismo ingresado por el usuario
  organismoSeleccionado: Organismo = {_id:"",identificador:"",encabezado:"",nombre:"",nombrec:"",descripcion:"",secuencia:"",imagen:"", __v:0,};;
  //Tipo de carga de secuencia
  opcionCarga: tipo[] = [
    { tipo: "Manual"},{ tipo: "Archivo"}
  ];
  opcionCargaSeleccionada!: tipo;
  //Comparar con la base o con una secuencia especifica
  opcionBase: boolean = false;
  //Organismo seleccionado de la lista en la base de datos
  orgSeleccionadoBase!: Organismo;
  //Tipo de alineamiento
  opcionAlineamiento: tipo[] = [
    {tipo:"Alineamiento Global"},{tipo:"Alineamiento Local"},{tipo:"Dotplot"},{tipo:"Needleman and Wunsch"}
  ]
  opcionAlineamientoSeleccionada!: tipo;
  //controlar las entradas
  regexSecuencia: RegExp = /^[ATCG]*$/;; 
  //Errores
  contieneErrores: boolean = false;
  mensajeError: Message[] = [
    {severity:'error', summary:'Error', detail:'La secuencia ingresada contiene caracteres no validos'}
  ];
  //Alineamiento local
  maximo: number = 58;
  rangoValoresBase: number[] = [0,58];
  rangoValoresIngresada: number[] = [0,0];
  //Needleman
  valoresNeedleman: variablesNeedleman = {coincidencia:0,noCoincidencia:0,gap:0};
  cambio: boolean = false;
  min: number = 0;

  constructor(private listadoService: ListadoService){}

  ngOnInit(): void {
    this.listadoService.getOrganismos()
      .subscribe( resp => {
        this.organismos = resp.organismos;
      });
  } 

  //Input secuencia manual
  inputSecuenciaIngresada(evento:any){
    const valor : string = evento.value;
    if(valor){
      this.organismoSeleccionado = {_id:"",identificador:"",encabezado:"",nombre:"",nombrec:"",descripcion:"",secuencia:"",imagen:"", __v:0,};
      this.organismoSeleccionado.secuencia = valor;
    }
    if(this.opcionAlineamientoSeleccionada?.tipo === "Alineamiento Local"){
      if(this.organismoSeleccionado){
        this.rangoValoresIngresada = [0, this.organismoSeleccionado.secuencia.length];
      }
    }
  }

  //Inputs de los valores de needleman and wunsch
  inputsNeedleman(){
    const valor:boolean = this.cambio;
    if(valor){
      this.cambio = false;
    }else{
      this.cambio = true;
    }
  }

  //Cuando hay cambios en el select del tipo de alineamiento
  cambiosTipoAlineamiento(){
    if(this.opcionAlineamientoSeleccionada?.tipo === "Alineamiento Local"){
      if(this.organismoSeleccionado){
        this.rangoValoresIngresada = [0, this.organismoSeleccionado.secuencia.length];
      }
    }
  }

  //Captura el archivo y lo pasa a texto
  cargaArchivo( archivo: any){
    const file = archivo.target.files[0]
    if(file){
      const reader: FileReader = new FileReader();
      reader.onload = ( e:any ) => {
        const resultado = e.target.result;
        this.conversion(resultado as string);
      }
      reader.readAsText(file);
    }
  }

  //Parte el archivo ya en texto separando el nombre como la secuencia
  conversion( resultado : string){
    this.contieneErrores = false;
    const primeraparte = resultado.split(/\r\n|\r|\n/, -1);
    const nombrec = primeraparte[0].split('|').pop()?.split(',')[0];
    let secuencia = "";
    for( let i = 1; i < primeraparte.length; i++ ){
      secuencia+= primeraparte[i]; 
    }
    if(!this.regexSecuencia.test(secuencia)){
      this.contieneErrores = true;
      return
    }
    this.organismoSeleccionado = {_id:"",identificador:"",encabezado:"",nombre:"",nombrec:"",descripcion:"",secuencia:"",imagen:"", __v:0,};
    this.organismoSeleccionado.secuencia = secuencia;
    this.organismoSeleccionado.nombrec = nombrec!.toString();
    this.rangoValoresIngresada = [0, secuencia.length];
  }

  //Cambios del select manual o archivo
  cambiosIngresoSecuencia(){
    this.contieneErrores = false;
    this.organismoSeleccionado = {_id:"",identificador:"",encabezado:"",nombre:"",nombrec:"",descripcion:"",secuencia:"",imagen:"", __v:0,};
    this.rangoValoresIngresada = [0, this.organismoSeleccionado.secuencia.length];
  }
 

}















  

