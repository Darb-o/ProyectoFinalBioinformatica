import { Component, } from '@angular/core';

import { Message } from 'primeng/api';

import { Organismo, tipo } from '../../interfaces/organismo.interface';
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
  organismoSeleccionado: Organismo = {_id:"",identificador:"",nombre:"",nombrec:"",descripcion:"",longitud:0,secuencia:"",imagen:"", __v:0,};;
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
  rangoValoresBase: number[] = [0,60];
  rangoValoresIngresada: number[] = [0,0];

  constructor(private listadoService: ListadoService){}

  ngOnInit(): void {
    this.listadoService.getOrganismos()
      .subscribe( resp => {
        this.organismos = resp.organismos;
        console.log(this.organismos);
      });
  } 

  inputSecuenciaIngresada(evento:any){
    const valor : string = evento.value;
    if(valor){
      this.organismoSeleccionado = {_id:"",identificador:"",nombre:"",nombrec:"",descripcion:"",longitud:0,secuencia:"",imagen:"", __v:0,};
      this.organismoSeleccionado.secuencia = valor;
    }
    if(this.opcionAlineamientoSeleccionada?.tipo === "Alineamiento Local"){
      if(this.organismoSeleccionado){
        this.rangoValoresIngresada = [0, this.organismoSeleccionado.secuencia.length];
      }
    }
  }

  cambiosTipoAlineamiento(){
    if(this.opcionAlineamientoSeleccionada?.tipo === "Alineamiento Local"){
      if(this.organismoSeleccionado){
        this.rangoValoresIngresada = [0, this.organismoSeleccionado.secuencia.length];
      }
    }
  }

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
    this.organismoSeleccionado = {_id:"",identificador:"",nombre:"",nombrec:"",descripcion:"",longitud:0,secuencia:"",imagen:"", __v:0,};
    this.organismoSeleccionado.secuencia = secuencia;
    this.organismoSeleccionado.nombrec = nombrec!.toString();
    this.organismoSeleccionado.longitud = secuencia.length;
    this.rangoValoresIngresada = [0, secuencia.length];
  }

  cambiosIngresoSecuencia(){
    this.contieneErrores = false;
    this.organismoSeleccionado = {_id:"",identificador:"",nombre:"",nombrec:"",descripcion:"",longitud:0,secuencia:"",imagen:"", __v:0,};
    this.rangoValoresIngresada = [0, this.organismoSeleccionado.secuencia.length];
  }




















  // bandera: boolean = true;
  // checked: boolean = true;
  // checado: boolean = false;
  // resultados: boolean = false;
  // arrayResultados: arrResult[] = [];
  // tipoAlineamiento: string = "global";
  // selectedOrganismo! : Organismo;
  // otroOrganismo!: Organismo;
  // texto: string = "Cambiar a archivo";
  // rangos: r = {
  //   secIn: 0,
  //   secOut: 0,
  //   basIn: 0,
  //   basOut: 0
  // }


  

  // numero(): number{
  //   if(this.checked){
  //     return 60;
  //   }
  //   return (this.otroOrganismo)?this.otroOrganismo.longitud:0;
  // }

  // resetear(){
  //   this.rangos={
  //     secIn: 0,
  //     secOut: 0,
  //     basIn: 0,
  //     basOut: 0
  //   }
  // }

  // validarCampo( $event: boolean){
  //   this.bandera = !$event;
  // }

  // boton1(evento:boolean){
  //   this.checado = evento;
  //   this.texto = (this.checado)? "Cambiar a caja de texto" : "Cambiar a archivo";
  // }

  // archivosec1( evento:any ){
  //   const file = evento.target.files[0]
  //   if(file){
  //     const reader: FileReader = new FileReader();
  //     reader.onload = ( e:any ) => {
  //       const resultado = e.target.result;
  //       this.convertir(resultado as string);
  //     }
  //     reader.readAsText(file);
  //   }
  // }

  // convertir( resultado : string){
  //   const ah = resultado.split(/\r\n|\r|\n/, -1);
  //   let cadena = "";
  //   for( let i = 1; i < ah.length; i++ ){
  //     cadena+= ah[i]; 
  //   }
  //   let nombre = ah[0].split(" ");
  //   let organismo = ""
  //   for( let i = 1; i < 3; i++){
  //     organismo+=nombre[i]+" "
  //   }
  //   this.selectedOrganismo.secuencia = cadena;
  //   this.selectedOrganismo.nombrec = organismo;
  // }

  // doResultados(){   
  //   this.arrayResultados = [];
  //   let texto = "";
  //   let longitud: number = this.selectedOrganismo.secuencia.length;
  //   let secuencia: string = this.selectedOrganismo.secuencia.toUpperCase();
  //   let puntuacion = 0;
  //   let porcentaje = -1;
  //   let menor: number = longitud;
  //   if(this.tipoAlineamiento === "global"){
  //     if(this.checked){
  //       for(let j = 0; j < this.organismos.length; j++){
  //         texto = "";
  //         puntuacion = 0;
  //         porcentaje = -1;
  //         menor = (longitud<=this.organismos[j].secuencia.length)?longitud:this.organismos[j].secuencia.length;
  //         for( let i = 0; i < menor ; i++ ){
  //           if(secuencia[i] === this.organismos[j].secuencia[i]){texto+="1";puntuacion++}else{texto+="0";};            
  //         }
  //         if(texto.length<this.organismos[j].secuencia.length){
  //           let valor = this.organismos[j].secuencia.length-texto.length;
  //           texto+="0".repeat(valor);
  //         }
  //         if(longitud === texto.length){
  //           porcentaje = (puntuacion * 100)/longitud;
  //         }
  //         const obj: arrResult = {
  //           texto,
  //           porcentaje,
  //           puntuacion
  //         }
  //         this.arrayResultados.push(obj);
  //       }        
  //     }else{
  //       menor = (longitud<=this.otroOrganismo.secuencia.length)?longitud:this.otroOrganismo.secuencia.length;
  //       for( let i = 0; i < menor ; i++ ){
  //         if(secuencia[i] === this.otroOrganismo.secuencia[i]){texto+="1";puntuacion++}else{texto+="0";}             
  //       }
  //       if(texto.length<this.otroOrganismo.secuencia.length){
  //         let valor = this.otroOrganismo.secuencia.length-texto.length;
  //         texto+="0".repeat(valor);
  //       }
  //       if(longitud === texto.length){
  //         porcentaje = (puntuacion * 100)/longitud;
  //       }
  //       const obj: arrResult = {
  //         texto,
  //         porcentaje,
  //         puntuacion
  //       }
  //       this.arrayResultados.push(obj);
  //     }
  //     }else{
  //       let diferenciaA = Math.abs(this.rangos.secIn-this.rangos.secOut);
  //       let diferenciaB = Math.abs(this.rangos.basIn-this.rangos.basOut);
  //       menor = (diferenciaA<=diferenciaB)?diferenciaA:diferenciaB;
  //       if(this.checked){
  //         for(let j = 0; j < this.organismos.length; j++){
  //           texto = "";
  //           puntuacion = 0;
  //           porcentaje = -1;
  //           for( let i = 0; i < menor ; i++ ){
  //             (secuencia[this.rangos.secIn+i] === this.organismos[j].secuencia[this.rangos.basIn+i])?texto+="1":texto+="0";             
  //           }
  //           if(texto.length<diferenciaB){
  //             let valor = diferenciaB-texto.length;
  //             texto+="0".repeat(valor);
  //           }
  //           if(diferenciaA === diferenciaB ){
  //             porcentaje = (puntuacion * 100)/diferenciaA;
  //           }
  //           const obj: arrResult = {
  //             texto,
  //             porcentaje,
  //             puntuacion
  //           }
  //           this.arrayResultados.push(obj);
  //         }        
  //       }else{
  //         for( let i = 0; i < menor ; i++ ){
  //           (secuencia[this.rangos.secIn+i] === this.otroOrganismo.secuencia[this.rangos.basIn+i])?texto+="1":texto+="0";             
  //         }
  //         if(diferenciaA === diferenciaB ){
  //           porcentaje = (puntuacion * 100)/diferenciaA;
  //         }
  //         if(texto.length<diferenciaB){
  //           let valor = diferenciaB-texto.length;
  //           texto+="0".repeat(valor);
  //         }
  //         const obj: arrResult = {
  //           texto,
  //           porcentaje,
  //           puntuacion
  //         }
  //         this.arrayResultados.push(obj);
  //       }
  //       this.rangos
  //     }
  // }
  
  

}















  

